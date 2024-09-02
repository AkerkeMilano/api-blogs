import {randomUUID} from "crypto";
import {add} from "date-fns";

import { userRepository } from "../repository/userRepository";
import { InputUserType, UserTypeId } from "../types";
import { StatusCode } from "../../settings";
import { passportService } from "../../adapters/passwordService";

type UserResult = {
    userId: string | null,
    status: StatusCode,
    message: [
        {field: string, message: string}
    ] | string
}
export const userService = {
    async registerUser(input: InputUserType): Promise<UserResult> {
        const isUserExistByEmail = await userRepository.checkExistingUserByEmail(input.email)
        const isUserExistByLogin = await userRepository.checkExistingUserByLogin(input.login)
        if(isUserExistByEmail) {
            return {
                userId: null,
                status: StatusCode.BadRequest,
                message: [{field: 'email', message: 'email should be unique'}]
                }
        }
        if(isUserExistByLogin) {
            return {
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
                isConfirmed: true
            }
        }
        
        const createdUserId = await userRepository.create(newUser)

        return {
            userId: createdUserId,
            status: StatusCode.Success,
            message: "User was created"
        }
    }, 
    async deleteUser(id: string) {
        const isUserExist = await userRepository.getById(id)
        if(!isUserExist) return false
        return await userRepository.delete(id)
    }
}