import { MongoMemoryServer } from 'mongodb-memory-server'
import { connectToDB } from '../src/db/mongo-db'

let mongoServer: MongoMemoryServer;


export const mongoMemoryServer = {
    async connect() {
        mongoServer = await MongoMemoryServer.create()
        const uri = mongoServer.getUri();
        await connectToDB(uri)
        console.log("Connected to Mongo Memory")
    },
    async disconnect() {
        await mongoServer.stop()
        console.log("Disconnected from Mongo Memory")
    }
}