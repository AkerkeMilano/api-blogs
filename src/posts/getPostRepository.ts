import { postCollection } from "../db/mongo-db"

export const getPostRepository = {
    async getAllPosts() {
        const postsArr = await postCollection.find({}).toArray();
        const mappedPosts = postsArr.map(post => {
            return {
                id: post._id,
                title: post.title,
                content: post.content,
                shortDescription: post.shortDescription,
                blogId: post.blogId,
                blogName: post.blogName
            }
        })
        return mappedPosts
    }
}