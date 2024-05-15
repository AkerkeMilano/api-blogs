import { blogCollection } from "../db/mongo-db"

export const getBlogsRepository = {
    async getAllBlogs() {
        const blogsArr = await blogCollection.find({}).toArray();
        const mappedArr = blogsArr.map(blog => {
            const mappedBlog = {
                    id: blog._id,
                    name: blog.name,
                    description: blog.description,
                    isMembership: blog.isMembership,
                    websiteUrl: blog.websiteUrl,
                    createdAt: blog.createdAt
            }
            console.log("mapped", mappedBlog)
            return mappedBlog
        })
        console.log("blogs", blogsArr)
        return mappedArr
    }
}