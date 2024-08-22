import { LoginEmailType } from "./types"
import { loginAuthRepository } from "./loginAuthRepository"
import { StatusCode } from "../settings"
import { passportService } from "../adapters/passwordService"
import { jwtService } from "./jwt/jwtService"
type UserResult = {
    token: string | null,
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
                token: null,
                status: StatusCode.Unauthtorized,
                message: "User is not found"
            }
        }
        
        const isPasswordValid = await passportService.compareHash(input.password, user.password)
        if(!isPasswordValid) {
            return {
                token: null,
                status: StatusCode.Unauthtorized,
                message: "Invalid password"
            }
        }

        const token = await jwtService.createJWT(user)

        return {
            token: token,
            status: StatusCode.NoContent,
            message: "User is logged in"
        }
    }
}