import { ObjectId } from "mongodb";
import { PostType, db } from "../db/db";
import { postCollection } from "../db/mongo-db";

export const deletePostRepository = {
    async delete(id: ObjectId): Promise<Boolean | undefined> {
        const removedBlog = await postCollection.deleteOne({_id: id})

        return removedBlog.acknowledged
    }
}