import { BlogType, dbBlogs } from "../db/dbBlogs";

export const deleteBlogsRepository = {
    async delete(id: string): Promise<BlogType | undefined> {
        const removedBlog = dbBlogs.blogs.find(blog => blog.id === id)

        if(removedBlog) {
            const filteredBlogs = dbBlogs.blogs.filter(blog => blog.id !== id)
            dbBlogs.blogs = filteredBlogs
        }

        return removedBlog
    }
}