import { InputPostType, PostTypeId, PostType_Id, ErrorType } from "./types"
import { BlogType, db, PostType } from "../db/db"
import { postBlogsRepository } from "../blogs/postBlogsRepository"
import { ObjectId } from 'mongodb';
import { postCollection } from "../db/mongo-db"

export const createPostRepository = {
    async create(input: InputPostType): Promise<PostTypeId | ErrorType> {
        const blog = await postBlogsRepository.find(input.blogId)
        const newPost = {
            ...input,
            blogName: blog?.name,
            createdAt: (new Date()).toISOString(),
            _id: new ObjectId()
        }

        try {
            const insertedPost = await postCollection.insertOne(newPost)
            return {
                id: insertedPost.insertedId.toString(),
                title: newPost.title,
                shortDescription: newPost.shortDescription,
                content: newPost.content,
                blogId: newPost.blogId,
                blogName: newPost.blogName,
                createdAt: newPost.createdAt
            }

        } catch(e: any) {
            return { error: e.message}
        }

    },

    async find(id: string) {
        return postCollection.findOne({_id: new ObjectId(id)})
    },

    async findMapOutput(id: string) {
        const post = await this.find(id)
        if(!post) return null
        return this.mapToOutput(post as PostType_Id)
    },
    mapToOutput(post: PostType_Id) {
        return {
            id: post._id,
            title: post.title,
            shortDescription: post.shortDescription,
            content: post.content,
            blogId: post.blogId,
            blogName: post.blogName,
            createdAt: post.createdAt
        }
    }
}