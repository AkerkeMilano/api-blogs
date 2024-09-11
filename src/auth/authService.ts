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
import { ObjectId } from "mongodb";

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
    async loginUser(input: LoginEmailType): Promise<UserResult> {
        const user = await authRepository.isUserExistByEmailOrLogin(input.loginOrEmail)
        console.log("user", user)
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

        const token = await jwtService.createJWT(user._id, '10s')
        const refreshToken = await jwtService.createJWT(user._id, '20s')
        await authRepository.saveRefreshToken(user._id, refreshToken)

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
        const userId = await jwtService.getUserIdByToken(prevToken) 
        if(!userId) return null
        const isTokenValid = await authRepository.isRefreshTokenValid(userId, prevToken)
        if(!isTokenValid) return null

        const token = await jwtService.createJWT(userId, '10s')
        const refreshToken = await jwtService.createJWT(userId, '20s')

        await authRepository.addTokenToBlackList(userId, prevToken)
        await authRepository.saveRefreshToken(userId, refreshToken)
        return {
            token,
            refreshToken
        }
    },

    async removeToken(prevToken: string) {
        const userId = await jwtService.getUserIdByToken(prevToken) 
        if(!userId) return null
        const isTokenValid = await authRepository.isRefreshTokenValid(userId, prevToken)
        if(!isTokenValid) return null
        const res = await authRepository.removeToken(userId, prevToken)
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