import { InputPostType, PostEntityType, PostViewType } from "../types"
import { postCollection } from "../../db/mongo-db"
import { ObjectId } from "mongodb"

//type CreatePostType = Omit<PostEntityType, '_id'>
//return createdId
export const postRepository = {
    async create(dto: PostEntityType): Promise<string | any> {
        try {
            const insertedPost = await postCollection.insertOne(dto)
            return insertedPost.insertedId.toString()
        } catch(e) {
            console.log("Post create error")
            return { error: e }
        }
    },
    async find(id: string): Promise<PostEntityType | null> {
        return await postCollection.findOne({_id: new ObjectId(id)})
    },
    async update(id: string, input: InputPostType){
        const post = await postCollection.updateOne(
            {_id: new ObjectId(id)}, 
            {$set: { ...input }}//update
            )
        return post
    },
    async delete(id: string): Promise<Boolean | undefined> {
        const removedBlog = await postCollection.deleteOne({_id: new ObjectId(id)})
        return removedBlog.acknowledged
    }
}