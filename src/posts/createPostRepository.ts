import { InputPostType, ErrorType } from "./types"
import { BlogType, db, PostType } from "../db/db"
import { postBlogsRepository } from "../blogs/postBlogsRepository"
import { ObjectId } from 'mongodb';
import { postCollection } from "../db/mongo-db"

export const createPostRepository = {
    async create(input: InputPostType): Promise<PostType | ErrorType> {
        const blog = await postBlogsRepository.find(new ObjectId(input.blogId))
        const newPost = {
            ...input,
            blogName: blog?.name,
            createdAt: (new Date()).toISOString()
        }

        try {
            const insertedPost = postCollection.insertOne(newPost)
            console.log("inserted post", insertedPost)

        } catch(e: any) {
            return { error: e.message}
        }


        return newPost
    },

    async find(id: ObjectId) {
        return postCollection.findOne({_id: id})
    }
}