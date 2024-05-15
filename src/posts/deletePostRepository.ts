import { ObjectId } from "mongodb";
import { PostType, db } from "../db/db";
import { postCollection } from "../db/mongo-db";
import { createPostRepository } from "./createPostRepository";

export const deletePostRepository = {
    async delete(id: string): Promise<Boolean | undefined> {
        const filteredPost = await createPostRepository.find(id)
        if(!filteredPost) return false
        const removedBlog = await postCollection.deleteOne({_id: new ObjectId(id)})

        return removedBlog.acknowledged
    }
}