    import { LoginEmailType } from "./types"
import { userCollection } from "../db/mongo-db";
import { ObjectId } from "mongodb";

export const authRepository = {
    async getById(id: string) {
        const user = await userCollection.findOne({ _id: new ObjectId(id)})
        return user
    },

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
    async isRefreshTokenValid(userId: string, refreshToken: string) {
        const user = await userCollection.findOne({ _id: new ObjectId(userId)})
        if(user?.tokenBlackList.includes(refreshToken)) return false
        return user?.currToken === refreshToken
    },

    async saveRefreshToken(id: ObjectId, token: string) {
        const user = await userCollection.updateOne(
            {_id: id},
            {$set: { currToken: token }}
        )
        if(user.matchedCount === 0) {
             return false
        }
        return true
    },

    async addTokenToBlackList(id: string, token: string) {
        const user = await userCollection.updateOne(
            {_id: new ObjectId(id)},
            {$push: { tokenBlackList: token }}
        )
        if(user.matchedCount === 0) {
            return false
       }
       return true
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