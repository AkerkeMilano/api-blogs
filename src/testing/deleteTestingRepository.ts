import { blogCollection, postCollection, userCollection, commentCollection, deviceCollection, apiCollection } from "../db/mongo-db"

export const deleteTestingRepository = {
    deleteAll() {
        blogCollection.deleteMany()
        postCollection.deleteMany()
        userCollection.deleteMany()
        commentCollection.deleteMany()
        deviceCollection.deleteMany()
        apiCollection.deleteMany()
    }
}