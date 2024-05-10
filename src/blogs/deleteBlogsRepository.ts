import { BlogType, db } from "../db/db";

export const deleteBlogsRepository = {
    async delete(id: string): Promise<BlogType | undefined> {
        const removedBlog = db.blogs.find(blog => blog.id === id)

        if(removedBlog) {
            const filteredBlogs = db.blogs.filter(blog => blog.id !== id)
            db.blogs = filteredBlogs
        }

        return removedBlog
    }
}