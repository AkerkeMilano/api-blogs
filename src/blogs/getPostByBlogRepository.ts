import { ObjectId } from "mongodb"
import { postCollection } from "../db/mongo-db"
import { blogCollection } from "../db/mongo-db"

export const getPostByBlogRepository = {
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
    async getAllPosts(query: any, blogId: string) {

        const filter = { blogId: blogId }
        const blog = await blogCollection.findOne({ _id: new ObjectId(blogId)})

        if(!blog){
            return
        }
        const totalCount = await postCollection.countDocuments(filter)
        const postsArr = await postCollection
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
                    items: postsArr.map(this.mapToOutput)
                }

    }
}