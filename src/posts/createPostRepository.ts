import { InputPostType, ErrorType } from "./types"
import { db, PostType } from "../db/db"

export const createPostRepository = {
    async create(input: InputPostType): Promise<PostType | ErrorType> {
        const newPost = {
            ...input,
            id: Math.round(Date.now() + Math.random()).toString()
        }

        try {
            db.posts = [...db.posts, newPost]
        } catch(e: any) {
            return { error: e.message}
        }

        return newPost
    },

    async find(id: string) {
        return db.posts.find(post => post.id === id)
    }
}