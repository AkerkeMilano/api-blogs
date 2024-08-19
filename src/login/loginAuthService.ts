import bcrypt from 'bcrypt';

import { LoginEmailType } from "./types"
import { loginAuthRepository } from "./loginAuthRepository"
import { StatusCode } from "../settings"

type UserResult = {
    status: StatusCode,
    message: [
        {field: string, message: string}
    ] | string
}

export const loginAuthService = {
    async loginUser(input: LoginEmailType): Promise<UserResult> {
        const user = await loginAuthRepository.isUserExistByEmailOrLogin(input.loginOrEmail)
        if(!user) {
            return {
                status: StatusCode.NotFound,
                message: "User is not found"
            }
        }
        
        const isPasswordValid = await bcrypt.compare(input.password, user.password)
        if(!isPasswordValid) {
            return {
                status: StatusCode.Unauthtorized,
                message: "Invalid password"
            }
        }

        return {
            status: StatusCode.NoContent,
            message: "User is logged in"
        }
    }
}