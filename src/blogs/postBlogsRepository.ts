import { dbBlogs, BlogType } from "../db/dbBlogs"
import { InputBlogType, ErrorType } from "./types"

export const postBlogsRepository = {
    async create(input: InputBlogType): Promise<BlogType | ErrorType> {
        const newBlog = {
            ...input,
            id: Math.round(Date.now() + Math.random()).toString()
        }

        try {
            dbBlogs.blogs = [...dbBlogs.blogs, newBlog]
        } catch(e: any) {
            return { error: e.message}
        }
        return newBlog
    },
    async find(id: string){
        return dbBlogs.blogs.find(blog => blog.id === id)
    }
}