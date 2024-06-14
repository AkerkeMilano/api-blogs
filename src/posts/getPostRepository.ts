import { postCollection } from "../db/mongo-db"

export const getPostRepository = {
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
    }
}