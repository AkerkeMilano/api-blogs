import { Collection, Db, MongoClient } from 'mongodb'
import { SETTINGS } from '../settings'
import { BlogType_Id } from '../blogs/types'
import { PostType_Id } from '../posts/types'
let client: MongoClient = {} as MongoClient
export let db: Db = {} as Db

export let blogCollection: Collection<BlogType_Id> = {} as Collection<BlogType_Id>
export let postCollection: Collection<PostType_Id> = {} as Collection<PostType_Id>

export const connectToDB = async (MONGO_URL: string) => {
    try {
        client = new MongoClient(MONGO_URL)
        db = client.db(SETTINGS.DN_NAME)
        blogCollection = db.collection<BlogType_Id>(SETTINGS.BLOG_COLLECTION_NAME)
        postCollection = db.collection<PostType_Id>(SETTINGS.POST_COLLECTION_NAME)
        await client.connect()
        console.log("Connected to DB!")
        return true
    } catch(e) {
        console.log(e)
        await client.close()
        return false
    }
}

