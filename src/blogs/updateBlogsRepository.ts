import { db, BlogType } from "../db/db"
import { InputBlogType, ErrorType } from "./types"

export const updateBlogsRepository = {
    async update(id: string, input: InputBlogType): Promise<InputBlogType | undefined> {
        const blog = db.blogs.find(blog => blog.id === id)
        const blogIndex = db.blogs.findIndex(blog => blog.id === id)

        if(blog) {
            db.blogs[blogIndex] = {
                ...input,
                id: db.blogs[blogIndex].id,
            }
        }
        return blog
    }
}