import { userCollection } from "../db/mongo-db"
import { ObjectId } from "mongodb"
export const deleteUserRepository = {
    async delete(id: string) {
        const selectedUser = await userCollection.findOne({ _id: new ObjectId(id) })
        if(!selectedUser) return false
        const removedBlog = await userCollection.deleteOne({ _id: new ObjectId(id)})
        return removedBlog.acknowledged
    }
}