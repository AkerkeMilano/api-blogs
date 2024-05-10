import { InputPostType, ErrorType } from "./types"
import { BlogType, db, PostType } from "../db/db"
import { findPostController } from "./findPostController"
import { postBlogsRepository } from "../blogs/postBlogsRepository"

export const createPostRepository = {
    async create(input: InputPostType): Promise<PostType | ErrorType> {
        const blog = db.blogs.find(blog => blog.id === input.blogId)
        
        const newPost = {
            ...input,
            id: Math.round(Date.now() + Math.random()).toString(),
            blogName: blog ? blog.name : ''
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