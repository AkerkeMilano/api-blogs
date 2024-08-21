import { ObjectId } from "mongodb"

import { UserTypeId, UserType_Id } from "../types"
import { userCollection } from "../../db/mongo-db"

export const userRepository = {
    async getById(id: string) {
        return await userCollection.findOne({ _id: new ObjectId(id)})
    },
    async create(input: UserType_Id): Promise<UserTypeId> {
        const insertedUser = await userCollection.insertOne(input)
        const user = {
            id: insertedUser.insertedId.toString(),
            login: input.login,
            email: input.email,
            createdAt: input.createdAt
        }
        return user
    },

    async checkExistingUserByEmail(email: string): Promise<UserType_Id | null> {
        const user = await userCollection.findOne({ email: email})
        return user
    },

    async checkExistingUserByLogin(login: string): Promise<UserType_Id | null> {
        const user = await userCollection.findOne({ login: login})
        return user
    },

    async delete(id: string) {
        const removedUser = await userCollection.deleteOne({ _id: new ObjectId(id)})
        return removedUser.acknowledged
    }
}