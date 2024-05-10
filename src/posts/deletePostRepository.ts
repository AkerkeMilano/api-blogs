import { PostType, db } from "../db/db";

export const deletePostRepository = {
    async delete(id: string): Promise<PostType | undefined> {
        const removedPost = db.posts.find(post => post.id === id)

        if(removedPost) {
            const filteredPosts = db.posts.filter(post => post.id !== id)
            db.posts = filteredPosts
        }

        return removedPost
    }
}