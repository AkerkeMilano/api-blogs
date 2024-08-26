import { blogCollection, postCollection, userCollection, commentCollection } from "../db/mongo-db"

export const deleteTestingRepository = {
    deleteAll() {
        blogCollection.deleteMany()
        postCollection.deleteMany()
        userCollection.deleteMany()
        commentCollection.deleteMany()
    }
}