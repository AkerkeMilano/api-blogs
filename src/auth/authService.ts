import {randomUUID} from "crypto";
import {add} from "date-fns";

import { LoginEmailType } from "./types"
import { authRepository } from "./authRepository"
import { StatusCode } from "../settings"
import { passportService } from "../adapters/passwordService"
import { jwtService } from "./jwt/jwtService"
import { InputUserType } from "../users/types";
import { userRepository } from "../users/repository/userRepository"
import { emailSender } from "../adapters/emailSender";
import { v4 as uuidv4 } from 'uuid';
import { authQueryRepository } from "./authQueryRepository";
import { securityDevicesRepository } from './../security/repository/securityDevicesRepository';

type UserResult = {
    token: string | null,
    refreshToken: string | null,
    userId: string | null,
    status: StatusCode,
    message: [
        {field: string, message: string}
    ] | string
}


export const authService = {
    async loginUser(input: LoginEmailType, deviceName: string | undefined, ip: string | undefined): Promise<UserResult> {
        const user = await authRepository.isUserExistByEmailOrLogin(input.loginOrEmail)

        if(!user) {
            return {
                token: null,
                refreshToken: null,
                userId: null,
                status: StatusCode.Unauthtorized,
                message: "User is not found"
            }
        }

        if(!user.emailConfirmation.isConfirmed){
            return {
                token: null,
                refreshToken: null,
                userId: null,
                status: StatusCode.Unauthtorized,
                message: "User is not found"
            }
        }
        
        const isPasswordValid = await passportService.compareHash(input.password, user.password)
        if(!isPasswordValid) {
            return {
                token: null,
                refreshToken: null,
                userId: null,
                status: StatusCode.Unauthtorized,
                message: "Invalid password"
            }
        }

        const deviceId = uuidv4();

        const token = await jwtService.createJWT({userId: user._id}, '60s')
        const refreshToken = await jwtService.createJWT({ userId: user._id, deviceId: deviceId}, '5m')
        const { issuedAt, expiresAt } = await jwtService.getIssuedExpDate(refreshToken)

        const deviceAuthToken = {
            userId: user._id.toString(),
            deviceId: deviceId,
            deviceName: deviceName,
            iat: issuedAt,
            ip: ip,
            exp: expiresAt
        }
        const insertedId = await authRepository.saveDeviceAuthToken(deviceAuthToken)
        //await authRepository.saveRefreshToken(user._id, refreshToken)

        return {
            token: token,
            refreshToken: refreshToken,
            userId: null,
            status: StatusCode.NoContent,
            message: "User is logged in"
        }
    },
    async registerUser(input: InputUserType) {
        const isUserExistByEmail = await userRepository.checkExistingUserByEmail(input.email)
        const isUserExistByLogin = await userRepository.checkExistingUserByLogin(input.login)
        if(isUserExistByEmail) {
            return {
                token: null,
                refreshToken: null,
                userId: null,
                status: StatusCode.BadRequest,
                message: [{field: 'email', message: 'email should be unique'}]
                }
        }
        if(isUserExistByLogin) {
            return {
                token: null,
                refreshToken: null,
                userId: null,
                status: StatusCode.BadRequest,
                message: [{field: 'login', message: 'login should be unique'}]
                }
        }

        const newUser = {
            login: input.login,
            email: input.email,
            password: await passportService.createHash(input.password),
            createdAt: (new Date()).toISOString(),
            emailConfirmation: {
                confirmationCode: randomUUID(),
                expirationDate: add(new Date(), {
                    hours: 1,
                    minutes: 30,
                }),
                isConfirmed: false
            },
            currToken: '',
            tokenBlackList: []
        }

        const createdUserId = await userRepository.create(newUser)

        emailSender.sendEmail(newUser.email, newUser.emailConfirmation.confirmationCode).catch((e) => { throw new Error('Email send error')})
        
        return {
            userId: createdUserId,
            token: null,
            refreshToken: null,
            status: StatusCode.Success,
            message: "User was created"
        }
    },
    async confirmEmail(code: string){
        const user = await authRepository.isUserExistByConfirmationCode(code)
        if(!user) return null
        if(user.emailConfirmation.isConfirmed) return null
        if(user.emailConfirmation.confirmationCode !== code || user.emailConfirmation.expirationDate < new Date()) return null
        let result = await authRepository.updateEmailConfirm(user._id)
        return result
    },
    async resendConfirmationCode(email: string) {
        const user = await authRepository.isUserExistByEmailOrLogin(email)
        if(!user) return null
        if(user.emailConfirmation.isConfirmed) return null

        const newCode = randomUUID()
        const newDate = add(new Date(), {
            hours: 1,
            minutes: 30,
        })

        const result = await authRepository.updateConfirmCode(user._id, newCode, newDate)

        emailSender.sendEmail(email, newCode).catch((e) => { console.log("Email send error", e)})

        return result
    },

    async refreshToken(prevToken: string) {
        const isTokenValid = await jwtService.isTokenNotExpired(prevToken)
        if(!isTokenValid) return null

        const {deviceId, userId} = await jwtService.getPayloadByToken(prevToken) 
        const { issuedAt, expiresAt } = await jwtService.getIssuedExpDate(prevToken)
        if(!userId) return null
   
        const device = await authQueryRepository.getDeviceById(deviceId)
        if(!device) return null
        if(device!.iat !== issuedAt) return null

        const token = await jwtService.createJWT({ userId: userId} , '60s')
        const refreshToken = await jwtService.createJWT({ userId: userId, deviceId: deviceId}, '5m')
        const updatedTime = await jwtService.getIssuedExpDate(refreshToken)

        await authRepository.updateRefreshToken(device!._id, updatedTime.issuedAt, updatedTime.expiresAt)

        return {
            token,
            refreshToken
        }
    },

    async removeToken(prevToken: string) {
        const isTokenNotExpired = await jwtService.isTokenNotExpired(prevToken)
        if(!isTokenNotExpired) return null

        const { deviceId, userId } = await jwtService.getPayloadByToken(prevToken) 
        if(!userId) return null
    
        const res = await securityDevicesRepository.deleteDeviceById(deviceId)
        return res
    },

    async getUserInfo(userId: string) {
        const user = await authRepository.getById(userId)
        if(!user) return null
        return {
            email: user?.email,
            login: user?.login,
            userId: userId
        }
    }
}