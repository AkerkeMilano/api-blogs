import { db, BlogType } from "../db/db"
import { InputBlogType, ErrorType } from "./types"

export const postBlogsRepository = {
    async create(input: InputBlogType): Promise<BlogType | ErrorType> {
        const newBlog = {
            ...input,
            id: Math.round(Date.now() + Math.random()).toString()
        }

        try {
            db.blogs = [...db.blogs, newBlog]
        } catch(e: any) {
            return { error: e.message}
        }
        return newBlog
    },
    async find(id: string){
        return db.blogs.find(blog => blog.id === id)
    }
}