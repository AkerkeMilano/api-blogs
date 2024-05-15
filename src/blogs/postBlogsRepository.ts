import { BlogType } from "../db/db"
import { InputBlogType, ErrorType, BlogTypeId, BlogType_Id } from "./types"
import { blogCollection } from "../db/mongo-db"
import { ObjectId } from "mongodb"

export const postBlogsRepository = {
    async create(input: InputBlogType): Promise<BlogTypeId | ErrorType> {
        const newBlog = {
            ...input,
            createdAt: (new Date()).toISOString(),
            isMembership: false,
            _id: new ObjectId()
        }

        try {
            const insertedInfo = await blogCollection.insertOne(newBlog)
            return {
                name: newBlog.name,
                description: newBlog.description,
                websiteUrl: newBlog.websiteUrl,
                createdAt: newBlog.createdAt,
                isMembership: newBlog.isMembership,
                id: insertedInfo.insertedId.toString()
            }
        } catch(e: any) {
            return { error: e.message}
        }
    },
    async find(id: ObjectId){
        return blogCollection.findOne({_id: id})

    },
    async findForOutput(id: ObjectId) {
        const blog = await this.find(id)
        if(!blog) return false
        return this.mapToOutput(blog as BlogType_Id)

    },
    mapToOutput(blog: BlogType_Id) {
        return {
            id: blog._id,
            name: blog.name,
            description: blog.description,
            isMembership: blog.isMembership,
            websiteUrl: blog.websiteUrl,
            createdAt: blog.createdAt
        }
    }
}