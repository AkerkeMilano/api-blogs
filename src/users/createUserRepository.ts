import { ObjectId } from "mongodb"
import bcrypt from "bcrypt"
import { InputUserType, UserTypeId, UserType_Id } from "./types"
import { userCollection } from "../db/mongo-db"

export const createUserRepository = {
    async create(input: InputUserType): Promise<UserTypeId> {
        const newUser = {
            ...input,
            _id: new ObjectId(),
            createdAt: (new Date()).toISOString()
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(newUser.password, saltRounds)
        const updatedUser = {
            ...newUser,
            password: hashedPassword
        }
        const insertedUser = await userCollection.insertOne(updatedUser)
        const user = {
            id: insertedUser.insertedId.toString(),
            login: newUser.login,
            email: newUser.email,
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
    }
}