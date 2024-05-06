import { dbBlogs } from "../db/dbBlogs"

export const getBlogsRepository = {
    getAllBlogs() {
        return dbBlogs.blogs
    }
}