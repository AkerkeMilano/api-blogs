import { ObjectId } from "mongodb"

import { InputUserType, UserPaginationType, UserTypeId, UserType_Id } from "../types"
import { userCollection } from "../../db/mongo-db"

export const userRepository = {
    async create(input: UserType_Id): Promise<UserTypeId> {
        const insertedUser = await userCollection.insertOne(input)
        const user = {
            id: insertedUser.insertedId.toString(),
            login: input.login,
            email: input.email,
            createdAt: (new Date()).toISOString(),
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
        const selectedUser = await userCollection.findOne({ _id: new ObjectId(id) })
        if(!selectedUser) return false
        const removedBlog = await userCollection.deleteOne({ _id: new ObjectId(id)})
        return removedBlog.acknowledged
    }
}