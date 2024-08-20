import { userCollection } from "../../db/mongo-db"
import { UserPaginationType } from "../types"

export const userQueryRepository = {
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
        const usersArr = await userCollection
            .find(filter)
            .sort(query.sortBy, query.sortDirection)
            .skip((query.pageNumber - 1) * query.pageSize)
            .limit(query.pageSize)
            .toArray() as any[]
  
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