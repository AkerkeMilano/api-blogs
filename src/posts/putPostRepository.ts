import { ObjectId } from "mongodb"
import { postBlogsRepository } from "../blogs/postBlogsRepository"
import { db } from "../db/db"
import { postCollection } from "../db/mongo-db"
import { InputPostType } from "./types"

export const putPostRepository = {
    async update(id: ObjectId, input: InputPostType): Promise<{ id?: string, error?: string}> {
        const blog = await postCollection.updateOne(
            {_id: id}, 
            {$set: { ...input }}
            )
        if(blog.matchedCount === 0) {
            return {error: "blog not found"}
        }
        return { id: id.toString() }
    }
}