    import { LoginEmailType } from "./types"
import { userCollection } from "../db/mongo-db";
import { ObjectId } from "mongodb";

export const authRepository = {
    // async login(input: LoginEmailType) {
        
    // },

    async isUserExistByEmailOrLogin(emailOrLogin: string) {
        const user = await userCollection.findOne({$or: [{'email': emailOrLogin}, {'login': emailOrLogin}]})
        return user
    },
    async isUserExistByConfirmationCode(emailConfirmCode: string) {
        const user = await userCollection.findOne({'emailConfirmation.confirmationCode': emailConfirmCode})
        return user
    },
    async updateEmailConfirm(id: ObjectId) {
        const result = await userCollection.updateOne(
            {_id: id},
            {$set: {'emailConfirmation.isConfirmed': true} }
        )
        return result.modifiedCount === 1
    },
    async updateConfirmCode(id: ObjectId, code: string, dt: Date) {
        const result = await userCollection.updateOne(
            {_id: id},
            {$set: {'emailConfirmation.confirmationCode': code, 'emailConfirmation.expirationDate': dt}}
        )
        return result.modifiedCount === 1
    },
    async removeToken(id: string , token: string) {
        const res = await userCollection.updateOne(
            {_id: new ObjectId(id) },
            {
            $set: { currToken: '' },
            $push: { tokenBlackList: token }
            }
        )
        return res.modifiedCount === 1
    }
}