import { InputPostType, PostType_Id } from "../types"
import { CommentType_Id } from "../../comments/types"
import { postCollection } from "../../db/mongo-db"
import { ObjectId } from "mongodb"
import { commentCollection } from "../../db/mongo-db"

export const postRepository = {
    async create(updatedInput: PostType_Id) {
        try {
            const insertedPost = await postCollection.insertOne(updatedInput)
            return {
                id: insertedPost.insertedId.toString(),
                title: updatedInput.title,
                shortDescription: updatedInput.shortDescription,
                content: updatedInput.content,
                blogId: updatedInput.blogId,
                blogName: updatedInput.blogName,
                createdAt: updatedInput.createdAt
            }
        } catch(e) {
            console.log("Post create error")
            return { error: e }
        }
    },
    async find(id: string) {
        return postCollection.findOne({_id: new ObjectId(id)})
    },
    async update(id: ObjectId, input: InputPostType){
        const post = await postCollection.updateOne(
            {_id: id}, 
            {$set: { ...input }}
            )
        return post
    },
    async delete(id: string): Promise<Boolean | undefined> {
        const removedBlog = await postCollection.deleteOne({_id: new ObjectId(id)})
        return removedBlog.acknowledged
    },
    async postComment(updatedComment: CommentType_Id) {
        try {
            const insertedComment = await commentCollection.insertOne(updatedComment)
        return {
            id: insertedComment.insertedId.toString(),
            content: updatedComment.content,
            commentatorInfo: {...updatedComment.commentatorInfo},
            createdAt: updatedComment.createdAt
        }
        } catch(e) {
            console.log("Comment create error")
            return e
        }
    }
}