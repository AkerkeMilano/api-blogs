import { db } from "../db/db"
export const getPostRepository = {
    async getAllPosts() {
        return db.posts
    }
}