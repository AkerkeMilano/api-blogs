import { InputBlogType, ErrorType } from "./types"
import { ObjectId } from 'mongodb';
import { blogCollection } from "../db/mongo-db";
import { postBlogsRepository } from "./postBlogsRepository";

export const updateBlogsRepository = {
    async update(id: string, input: InputBlogType): Promise<boolean | null> {
        const filteredBlog = await postBlogsRepository.find(id)
        if(!filteredBlog) {
            return false
        }
        const blog = await blogCollection.updateOne(
            {_id: new ObjectId(id)}, 
            {$set: { ...input }}
            )
        if(blog.matchedCount === 0) {
            return false
        }
        return true
    }
}