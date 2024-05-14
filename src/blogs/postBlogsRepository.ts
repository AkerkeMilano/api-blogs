import { BlogType } from "../db/db"
import { InputBlogType, ErrorType } from "./types"
import { blogCollection } from "../db/mongo-db"
import { ObjectId } from "mongodb"

export const postBlogsRepository = {
    async create(input: InputBlogType): Promise<BlogType | ErrorType> {
        const newBlog = {
            ...input,
            createdAt: (new Date()).toISOString(),
            isMembership: true
        }

        try {
            const insertedInfo = await blogCollection.insertOne(newBlog)
        } catch(e: any) {
            return { error: e.message}
        }
        return newBlog
    },
    async find(id: ObjectId){
        return blogCollection.findOne({_id: id})
    }
}