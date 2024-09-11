import { Collection, Db, MongoClient } from 'mongodb'
import { SETTINGS } from '../settings'
import { BlogType_Id } from '../blogs/types'
import { PostEntityType } from '../posts/types'
import { UserEntityType } from '../users/types'
import { CommentEntityType } from '../comments/types'

let client: MongoClient = {} as MongoClient
export let db: Db = {} as Db

export let blogCollection: Collection<BlogType_Id> = {} as Collection<BlogType_Id>
export let postCollection: Collection<PostEntityType> = {} as Collection<PostEntityType>
export let userCollection: Collection<UserEntityType> = {} as Collection<UserEntityType>
export let commentCollection: Collection<CommentEntityType> = {} as Collection<CommentEntityType>


export const connectToDB = async (MONGO_URL: string) => {
    try {
        client = new MongoClient(MONGO_URL)
        db = client.db(SETTINGS.DN_NAME)
        blogCollection = db.collection<BlogType_Id>(SETTINGS.BLOG_COLLECTION_NAME)
        postCollection = db.collection<PostEntityType>(SETTINGS.POST_COLLECTION_NAME)
        userCollection = db.collection<UserEntityType>(SETTINGS.USER_COLLECTION_NAME)
        commentCollection = db.collection<CommentEntityType>(SETTINGS.COMMENT_COLLECTION_NAME)

        await client.connect()
        console.log("Connected to DB!")
        
        return true
    } catch(e) {
        console.log(e)
        await client.close()
        return false
    }
}

