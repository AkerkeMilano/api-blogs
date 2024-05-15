import { blogCollection } from "../db/mongo-db"

export const getBlogsRepository = {
    async getAllBlogs() {
        const blogsArr = await blogCollection.find({}).toArray();
        blogsArr.map(blog => {
            const mappedBlog = {
                    id: blog._id,
                    ...blog
            }
            return mappedBlog
        })
    }
}