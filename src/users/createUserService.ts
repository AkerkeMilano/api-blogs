import { createUserRepository } from "./createUserRepository";
import { InputUserType, UserTypeId } from "./types";
import { StatusCode } from "../settings";

type UserResult = {
    data: UserTypeId | null,
    status: StatusCode,
    message: [
        {field: string, message: string}
    ] | string
}
export const createUserService = {
    async registerUser(input: InputUserType): Promise<UserResult> {
        const isUserExistByEmail = await createUserRepository.checkExistingUserByEmail(input.email)
        const isUserExistByLogin = await createUserRepository.checkExistingUserByLogin(input.login)
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
        const createdUser = await createUserRepository.create(input)
        return {
            data: createdUser,
            status: StatusCode.Success,
            message: "User was created"
        }
    }
}