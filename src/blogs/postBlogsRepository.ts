import { BlogType } from "../db/db"
import { InputBlogType, ErrorType, BlogTypeId, BlogType_Id } from "./types"
import { blogCollection } from "../db/mongo-db"
import { ObjectId } from "mongodb"

export const postBlogsRepository = {
    async create(input: InputBlogType): Promise<BlogTypeId | ErrorType> {
        const newBlog = {
            ...input,
            createdAt: (new Date()).toISOString(),
            isMembership: true,
            _id: new ObjectId()
        }

        try {
            const insertedInfo = await blogCollection.insertOne(newBlog)
            return {
                ...newBlog,
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
        return this.mapToOutput(blog as BlogType_Id)
    },
    mapToOutput(blog: BlogType_Id) {
        return {
            id: blog._id,
            ...blog
        }
    }
}