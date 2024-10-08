import { ObjectId } from "mongodb"
import { commentCollection } from "../../db/mongo-db"
import { CommentInputType, CommentEntityType } from "../types"
export const commentRepository = {
    async create(dto: CommentEntityType): Promise<string | any> {
        try {
            const insertedComment = await commentCollection.insertOne(dto)
            return insertedComment.insertedId.toString()
        } catch(e) {
            return { error: e}
        }
    },
    async findById(id: string) {
        return await commentCollection.findOne({ _id: new ObjectId(id)})
    },
    async delete(id: string) {
        const removedComment = await commentCollection.deleteOne({ _id: new ObjectId(id)})
        return removedComment.acknowledged
    },
    async update(id: string, input: CommentInputType) {
        const comment = await commentCollection.updateOne(
            {_id: new ObjectId(id)},
            {$set: {...input}}
        )
        if(comment.matchedCount === 0) {
            return false
        }
        return true
    }
}
