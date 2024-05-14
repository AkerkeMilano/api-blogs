import { InputBlogType, ErrorType } from "./types"
import { ObjectId } from 'mongodb';
import { blogCollection } from "../db/mongo-db";

export const updateBlogsRepository = {
    async update(id: ObjectId, input: InputBlogType): Promise<{ id?: string, error?: string }> {
        const blog = await blogCollection.updateOne(
            {_id: id}, 
            {$set: { ...input }}
            )
        if(blog.matchedCount === 0) {
            return {error: "blog not found"}
        }
        return { id: id.toString() }
    }
}