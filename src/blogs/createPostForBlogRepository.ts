import { ObjectId } from "mongodb"
import { blogCollection, postCollection } from "../db/mongo-db"
import { InputPostType } from "../posts/types"

export const createPostForBlogRepository = async (input: InputPostType, blogId: string) => {
    const blog = await blogCollection.findOne({_id: new ObjectId(blogId)})
    const newPost = {
        ...input,
        blogId: blogId,
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
        return { error: e.message }
    }
}