import { userCollection } from "../db/mongo-db"
import { UserTypeId, UserType_Id } from "./types"
export const getUserRepository = {
    async getAllUsers(): Promise<UserTypeId[]> {
        const users = await userCollection.find().toArray() as any[]
        const mappedUsers = users.map(user => {
            return {
                id: user._id.toString(),
                login: user.login,
                email: user.email,
                password: user.password,
                createdAt: user.createdAt
                
            }
        })
        return mappedUsers
    }
}