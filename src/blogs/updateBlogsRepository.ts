import { InputBlogType, ErrorType } from "./types"
import { ObjectId } from 'mongodb';
import { blogCollection } from "../db/mongo-db";

export const updateBlogsRepository = {
    async update(id: ObjectId, input: InputBlogType): Promise<ObjectId | null> {
        console.log("updated id-------", id, input)
        const blog = await blogCollection.updateOne(
            {_id: id}, 
            {
            $set: { 
                name: input.name
             }
            }
            )
        console.log("blog--------", blog)
        return blog.upsertedId
    }
}