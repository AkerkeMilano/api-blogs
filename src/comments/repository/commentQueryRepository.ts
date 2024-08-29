import { ObjectId } from "mongodb"
import { commentCollection } from "../../db/mongo-db"

export const commentQueryRepository = {
    async getById(id: string){
        try {
            const comment = await commentCollection.findOne({_id: new ObjectId(id)})
            return comment && {
                id: comment._id,
                content: comment.content,
                commentatorInfo: {...comment.commentatorInfo},
                createdAt: comment.createdAt
            }
        } catch(e) {
            return null
        }
    }
}
