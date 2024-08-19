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
    },

    async getAllUsers(query: any): Promise<UserPaginationType> {
        const loginSearch = query.searchLoginTerm
            ? { login: {$regex: query.searchLoginTerm, $options: 'i'}}
            : {}
        const emailSearch = query.searchEmailTerm
            ? { email: {$regex: query.searchEmailTerm, $options: 'i'}}
            : {}
        const filter = {
            $or: [
                {
                    $or: [
                        loginSearch,
                        emailSearch
                    ]
                },
                {
                    $and: [
                        loginSearch,
                        emailSearch
                    ]
                }
            ]
        }

        const totalCount = await userCollection.countDocuments(filter)
        console.log("totalCount", totalCount)
        const usersArr = await userCollection
            .find(filter)
            .sort(query.sortBy, query.sortDirection)
            .skip((query.pageNumber - 1) * query.pageSize)
            .limit(query.pageSize)
            .toArray() as any[]
        const myLogin = await userCollection.find({ login: query.searchLoginTerm }).toArray() as any[]
        const mappedUsers = usersArr.map(user => {
            return {
                id: user._id.toString(),
                login: user.login,
                email: user.email,
                createdAt: user.createdAt
            }
        })
        return {
            pagesCount: Math.ceil(totalCount / query.pageSize),
            page: query.pageNumber,
            pageSize: query.pageSize,
            totalCount,
            items: mappedUsers
        }
    }
}