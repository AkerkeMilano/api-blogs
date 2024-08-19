import { blogCollection, postCollection, userCollection } from "../db/mongo-db"

export const deleteTestingRepository = {
    deleteAll() {
        blogCollection.deleteMany()
        postCollection.deleteMany()
        userCollection.deleteMany()
    }
}