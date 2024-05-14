import { postCollection } from "../db/mongo-db"

export const getPostRepository = {
    async getAllPosts() {
        return postCollection.find({}).toArray();
    }
}