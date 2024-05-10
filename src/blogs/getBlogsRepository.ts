import { db } from "../db/db"

export const getBlogsRepository = {
    getAllBlogs() {
        return db.blogs
    }
}