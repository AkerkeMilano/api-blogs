import { ObjectId } from "mongodb";
import { BlogType, db } from "../db/db";
import { blogCollection } from "../db/mongo-db";

export const deleteBlogsRepository = {
    async delete(id: ObjectId): Promise<Boolean | undefined> {
        const removedBlog = await blogCollection.deleteOne({_id: id})

        return removedBlog.acknowledged
    }
}