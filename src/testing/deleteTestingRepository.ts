import { blogCollection, postCollection } from "../db/mongo-db"

export const deleteTestingRepository = {
    deleteAll() {
        blogCollection.deleteMany()
        postCollection.deleteMany()
    }
}