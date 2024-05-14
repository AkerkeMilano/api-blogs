import { Collection, Db, MongoClient } from 'mongodb'
import { SETTINGS } from '../settings'
import { BlogType, PostType } from './db'
let client: MongoClient = {} as MongoClient
export let db: Db = {} as Db

export let blogCollection: Collection<BlogType> = {} as Collection<BlogType>
export let postCollection: Collection<PostType> = {} as Collection<PostType>

export const connectToDB = async (MONGO_URL: string) => {
    try {
        client = new MongoClient(MONGO_URL)
        db = client.db(SETTINGS.DN_NAME)
        blogCollection = db.collection<BlogType>(SETTINGS.BLOG_COLLECTION_NAME)
        postCollection = db.collection<PostType>(SETTINGS.POST_COLLECTION_NAME)
        await client.connect()
        console.log("Connected to DB!")
        return true
    } catch(e) {
        console.log(e)
        await client.close()
        return false
    }
}

