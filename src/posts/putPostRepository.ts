import { db, BlogType } from "../db/db"
import { InputPostType, ErrorType } from "./types"

export const putPostRepository = {
    async update(id: string, input: InputPostType): Promise<InputPostType | undefined> {
        const post = db.posts.find(post => post.id === id)
        const postIndex = db.posts.findIndex(post => post.id === id)

        if(post) {
            db.posts[postIndex] = {
                ...input,
                id: db.posts[postIndex].id
            }
        }
        
        return post
    }
}