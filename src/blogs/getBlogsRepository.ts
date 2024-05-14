import { db } from "../db/db"
import { blogCollection } from "../db/mongo-db"

export const getBlogsRepository = {
    async getAllBlogs() {
        return blogCollection.find({}).toArray();
        //return db.blogs
    }
}