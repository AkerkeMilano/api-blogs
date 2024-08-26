import { ObjectId } from "mongodb"
import { commentRepository } from "../repository/commentRepository"
import { CommentInputType } from "../types"
import { UserType_Id } from "../../users/types"
import { userRepository } from "../../users/repository/userRepository"
import { StatusCode } from "../../settings"
type CommentResult = {
    status: StatusCode,
    success: Boolean
}
export const commentService = {
    async deleteComment(id: string, user: any): Promise<CommentResult>{
        const comment = await commentRepository.findById(id)
        if(!comment) {
            return {
                status: StatusCode.NotFound,
                success: false
            }
        }
        if(comment?.commentatorInfo.userId !== user._id.toString()){
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
    async updateComment(id: string, input: CommentInputType, user: any): Promise<CommentResult> {
        const filteredComment = await commentRepository.findById(id)
        if(!filteredComment){
            return {
                status: StatusCode.NotFound,
                success: false
            }
        }
        if(filteredComment?.commentatorInfo.userId !== user._id.toString()){
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