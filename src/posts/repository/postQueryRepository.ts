import { ObjectId } from "mongodb"
import { postCollection, commentCollection } from "../../db/mongo-db"
import { PostType_Id } from "../types"

export const postQueryRepository = {
    mapToOutput(post: any) {
        return {
            id: post._id,
            title: post.title,
            content: post.content,
            shortDescription: post.shortDescription,
            blogId: post.blogId,
            blogName: post.blogName,
            createdAt: post.createdAt
        }
    },
    mapComments(comment: any) {
        return {
            id: comment._id,
            content: comment.content,
            commentatorInfo: {...comment.commentatorInfo},
            createdAt: comment.createdAt
        }
    },
    async getAllPosts(query: any) {
        const totalCount = await postCollection.countDocuments()
        const postsArr = await postCollection
                .find()
                .sort(query.sortBy, query.sortDirection)
                .skip((query.pageNumber - 1) * query.pageSize)
                .limit(query.pageSize)
                .toArray() as any[]
        return {
                    pagesCount: Math.ceil(totalCount / query.pageSize),
                    page: query.pageNumber,
                    pageSize: query.pageSize,
                    totalCount,
                    items: postsArr.map(this.mapToOutput)
                }
    },
    async findById(id: string) {
        const post = postCollection.findOne({_id: new ObjectId(id)})
        if(!post) return null
        return this.mapToOutput(post)
    },

    async findCommentsById(postId: string, query: any) {
        const post = await postCollection.findOne({ _id: new ObjectId(postId) })
        if(!post) return null

        const filter = { postId: postId }
        const totalCount = await postCollection.countDocuments()
        const commentsArr = await commentCollection
                .find(filter)
                .sort(query.sortBy, query.sortDirection)
                .skip((query.pageNumber - 1) * query.pageSize)
                .limit(query.pageSize)
                .toArray() as any[]
        return {
                    pagesCount: Math.ceil(totalCount / query.pageSize),
                    page: query.pageNumber,
                    pageSize: query.pageSize,
                    totalCount,
                    items: commentsArr.map(this.mapComments)
                }
    }
}