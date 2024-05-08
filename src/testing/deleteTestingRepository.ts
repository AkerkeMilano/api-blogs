import { dbBlogs } from "../db/dbBlogs"

export const deleteTestingRepository = {
    deleteAll() {
        dbBlogs.blogs = []
    }
}