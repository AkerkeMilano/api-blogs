import { db } from "../db/db"

export const deleteTestingRepository = {
    deleteAll() {
        db.blogs = []
        db.posts = []
    }
}