import { LoginEmailType } from "./types"
import { userCollection } from "../db/mongo-db";

export const loginAuthRepository = {
    // async login(input: LoginEmailType) {
        
    // },

    async isUserExistByEmailOrLogin(emailOrLogin: string) {
        const user = await userCollection.findOne({$or: [{'email': emailOrLogin}, {'login': emailOrLogin}]})
        return user
    }
}