import { ObjectId } from "mongodb"
import { commentRepository } from "../repository/commentRepository"
import { CommentInputType, CommentEntityType } from "../types"
import { userRepository } from "../../users/repository/userRepository"
import { StatusCode } from "../../settings"
type CommentResult = {
    status: StatusCode,
    success: Boolean
}
export const commentService = {
    async createComment(postId: string, input: CommentInputType, userId: string): Promise<string | null> {
        const user = await userRepository.getById(userId)
        const dtoComment = {
            postId: postId,
            content: input.content,
            commentatorInfo: {
                userId: userId,
                userLogin: user!.login
            },
            createdAt: (new Date()).toISOString()
        }
        const insertedCommentId = await commentRepository.create(dtoComment)
        return insertedCommentId
    },
    async deleteComment(id: string, userId: string): Promise<CommentResult>{
        const comment = await commentRepository.findById(id)
        if(!comment) {
            return {
                status: StatusCode.NotFound,
                success: false
            }
        }
        if(comment?.commentatorInfo.userId !== userId){
            return {
                status: StatusCode.Forbidden,
                success: false
            }
        }
        const isDeleted = await commentRepository.delete(id)
        return {
            status: StatusCode.NoContent,
            success: isDeleted
        }
    },
    async updateComment(id: string, input: CommentInputType, userId: string): Promise<CommentResult> {
        const filteredComment = await commentRepository.findById(id)
        if(!filteredComment){
            return {
                status: StatusCode.NotFound,
                success: false
            }
        }
        if(filteredComment?.commentatorInfo.userId !== userId){
            return {
                status: StatusCode.Forbidden,
                success: false
            }
        }
        const isUpdated = await commentRepository.update(id, input)
        return {
            status: StatusCode.NoContent,
            success: isUpdated
        }
    }
}

///createCommment by postId here