import { dbBlogs, BlogType } from "../db/dbBlogs"
import { InputBlogType, ErrorType } from "./types"

export const updateBlogsRepository = {
    async update(id: string, input: InputBlogType): Promise<InputBlogType | undefined> {
        const blog = dbBlogs.blogs.find(blog => blog.id === id)
        const blogIndex = dbBlogs.blogs.findIndex(blog => blog.id === id)

        if(blog) {
            dbBlogs.blogs[blogIndex] = {
                ...input,
                id: dbBlogs.blogs[blogIndex].id,
            }
        }
        return blog
    }
}