import { postBlogsRepository } from "../blogs/postBlogsRepository"
import { db } from "../db/db"
import { InputPostType } from "./types"

export const putPostRepository = {
    async update(id: string, input: InputPostType): Promise<InputPostType | undefined> {
        const blog = await postBlogsRepository.find(input.blogId)

        const post = db.posts.find(post => post.id === id)
        const postIndex = db.posts.findIndex(post => post.id === id)

        if(post) {
            db.posts[postIndex] = {
                ...input,
                id: db.posts[postIndex].id,
                blogName: blog?.name
                
            }
        }
        
        return post
    }
}