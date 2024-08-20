import { userRepository } from "../repository/userRepository";
import { userQueryRepository } from "../repository/userQueryRepository";
import { InputUserType, UserTypeId } from "../types";
import { StatusCode } from "../../settings";
import { ObjectId } from "mongodb";

import { passportService } from "../../adapters/passwordService";

type UserResult = {
    data: UserTypeId | null,
    status: StatusCode,
    message: [
        {field: string, message: string}
    ] | string
}
export const userService = {
    async getAll(query: any) {
        const users = await userQueryRepository.getAllUsers(query)
        return users
    },
    async registerUser(input: InputUserType): Promise<UserResult> {
        const isUserExistByEmail = await userRepository.checkExistingUserByEmail(input.email)
        const isUserExistByLogin = await userRepository.checkExistingUserByLogin(input.login)
        if(isUserExistByEmail) {
            return {
                data: null,
                status: StatusCode.BadRequest,
                message: [{field: 'email', message: 'email should be unique'}]
                }
        }
        if(isUserExistByLogin) {
            return {
                data: null,
                status: StatusCode.BadRequest,
                message: [{field: 'login', message: 'login should be unique'}]
                }
        }

        const newUser = {
            ...input,
            _id: new ObjectId(),
            createdAt: (new Date()).toISOString()
        }
        
        const updatedUser = {
            ...newUser,
            password: await passportService.createHash(newUser.password)
        }

        const createdUser = await userRepository.create(updatedUser)
        return {
            data: createdUser,
            status: StatusCode.Success,
            message: "User was created"
        }
    }, 
    async deleteUser(id: string) {
        return await userRepository.delete(id)
    }
}