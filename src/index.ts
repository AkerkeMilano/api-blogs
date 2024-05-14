import {app} from './app'
import {SETTINGS} from './settings'
import { connectToDB } from './db/mongo-db'

const start = async () => {
   const connect =  await connectToDB(SETTINGS.MONGO_URL)
    if(!connect) {
        console.log("not connected to DB")
        process.exit(1)
    }
}
app.listen(SETTINGS.PORT, () => {
    console.log('...server started', SETTINGS.PORT)
})

start()