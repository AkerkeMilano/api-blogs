import { ObjectId } from "mongodb"
import { postBlogsRepository } from "../../blogs/postBlogsRepository"
import { postRepository } from "../repository/postRepository"
import { InputPostType } from "../types"
import { UserType_Id } from "../../users/types"
import { CommentInputType } from "../../comments/types"

export const postService = {
    async create(input: InputPostType) {
        const blog = await postBlogsRepository.find(input.blogId)
        const updatedInput = {
            ...input,
            blogName: blog?.name,
            createdAt: (new Date()).toISOString(),
            _id: new ObjectId()
        }
        return await postRepository.create(updatedInput)
    },
    async update(id: string, input: InputPostType) {
        const post = await postRepository.update(new ObjectId(id), input)
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
    async postComment(postId: string, inputComment: CommentInputType, user: UserType_Id) {
        const post = await postRepository.find(postId)
        if(!post) return null

        const updatedComment = {
            _id: new ObjectId(),
            postId: postId,
            content: inputComment.content,
            commentatorInfo: {
                userId: user._id.toString(),
                userLogin: user.login
            },
            createdAt: (new Date()).toISOString()
        }
        const insertedComment = await postRepository.postComment(updatedComment)
        return insertedComment
    }
}
