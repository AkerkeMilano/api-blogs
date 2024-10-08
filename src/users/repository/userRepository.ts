import { ObjectId } from "mongodb"

import { UserEntityType } from "../types"
import { userCollection } from "../../db/mongo-db"

export const userRepository = {
    async getById(id: string) {
        return await userCollection.findOne({ _id: new ObjectId(id)})
    },
    async create(input: UserEntityType): Promise<string> {
        const insertedUser = await userCollection.insertOne(input)
        return insertedUser.insertedId.toString()
    },

    async checkExistingUserByEmail(email: string): Promise<boolean> {
        const user = await userCollection.findOne({ email: email})
        return !!user
    },

    async checkExistingUserByLogin(login: string): Promise<boolean> {
        const user = await userCollection.findOne({ login: login})
        return !!user
    },

    async delete(id: string) {
        const removedUser = await userCollection.deleteOne({ _id: new ObjectId(id)})
        return removedUser.acknowledged
    }
}