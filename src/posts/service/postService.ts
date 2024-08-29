import { ObjectId } from "mongodb"
import { postBlogsRepository } from "../../blogs/postBlogsRepository"
import { postRepository } from "../repository/postRepository"
import { InputPostType } from "../types"
import { CommentInputType } from "../../comments/types"
import { commentService } from "../../comments/service/commentService"
export const postService = {
    async create(input: InputPostType): Promise<string> {
        const blog = await postBlogsRepository.find(input.blogId)
        const updatedInput = {
            title: input.title,
            shortDescription: input.shortDescription,
            content: input.content,
            blogId: input.blogId,
            blogName: blog?.name,
            createdAt: (new Date()).toISOString()
        }
        return await postRepository.create(updatedInput)
    },
    async update(id: string, input: InputPostType) {
        const post = await postRepository.update(id, input)
        if(post.matchedCount === 0) {
            return null
        }
        return post
    },
    async delete(id: string) {
        const post = await postRepository.find(id)
        if(!post) return false
        return await postRepository.delete(id)
    },
    async postComment(postId: string, input: CommentInputType, userId: string) {
        const post = await postRepository.find(postId)
        if(!post) return null
        const insertedCommentId = await commentService.createComment(postId, input, userId)
        return insertedCommentId
    }
}
