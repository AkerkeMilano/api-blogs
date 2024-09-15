import express from 'express'
import cookieParser from 'cookie-parser'
import {SETTINGS} from "./settings"
import { blogsRouter } from './blogs'
import { testingRouter } from './testing'
import { postsRouter } from './posts'
import { userRouter } from './users'
import { authRouter } from './auth'
import { commentRouter } from './comments'
import { securityDevicesRouter } from './security'

//test
export const app = express()
app.use(express.json())
app.set('trust proxy', true);

app.get('/', (req, res) => {
  res.send('Hello, third homework')
})

app.use(cookieParser())
app.use(SETTINGS.PATH.BLOGS, blogsRouter)
app.use(SETTINGS.PATH.POSTS, postsRouter)
app.use(SETTINGS.PATH.TESTING, testingRouter)
app.use(SETTINGS.PATH.USERS, userRouter)
app.use(SETTINGS.PATH.AUTH, authRouter)
app.use(SETTINGS.PATH.COMMENTS, commentRouter)
app.use(SETTINGS.PATH.SECURITY, securityDevicesRouter)
