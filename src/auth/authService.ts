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
type UserResult = {
    token: string | null,
    userId: string | null,
    status: StatusCode,
    message: [
        {field: string, message: string}
    ] | string
}


export const authService = {
    async loginUser(input: LoginEmailType): Promise<UserResult> {
        const user = await authRepository.isUserExistByEmailOrLogin(input.loginOrEmail)
        if(!user) {
            return {
                token: null,
                userId: null,
                status: StatusCode.Unauthtorized,
                message: "User is not found"
            }
        }

        if(!user.emailConfirmation.isConfirmed){
            return {
                token: null,
                userId: null,
                status: StatusCode.Unauthtorized,
                message: "User is not found"
            }
        }
        
        const isPasswordValid = await passportService.compareHash(input.password, user.password)
        if(!isPasswordValid) {
            return {
                token: null,
                userId: null,
                status: StatusCode.Unauthtorized,
                message: "Invalid password"
            }
        }

        const token = await jwtService.createJWT(user._id)

        return {
            token: token,
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
                userId: null,
                status: StatusCode.BadRequest,
                message: [{field: 'email', message: 'email should be unique'}]
                }
        }
        if(isUserExistByLogin) {
            return {
                token: null,
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
            }
        }

        const regHTML = `
        <h1>Thank for your registration</h1>
        <p>To finish registration please follow the link below:
            <a href='https://somesite.com/confirm-email?code=${newUser.emailConfirmation.confirmationCode}'>complete registration</a>
        </p>
       `; 

        const createdUserId = await userRepository.create(newUser)
        try {
            await emailSender.sendEmail(input.email, "Welcome to our website", regHTML)
        } catch(e){
            console.log("email error ", e)
        }
   
        return {
            userId: createdUserId,
            token: null,
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
        const regHTML = `
        <h1>Thank for your registration</h1>
        <p>To finish registration please follow the link below:
            <a href='https://somesite.com/confirm-email?code=${user.emailConfirmation.confirmationCode}'>complete registration</a>
        </p>
       `; 

        try {
            await emailSender.sendEmail(email, "Welcome to our website", regHTML)
        } catch(e){
            console.log("email error ", e)
        }
        return user
    }
}