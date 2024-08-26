import express from 'express'
import {SETTINGS} from "./settings"
import { blogsRouter } from './blogs'
import { testingRouter } from './testing'
import { postsRouter } from './posts'
import { userRouter } from './users'
import { loginRouter } from './login'
import { commentRouter } from './comments'
//test
export const app = express()
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello, third homework')
})

app.use(SETTINGS.PATH.BLOGS, blogsRouter)
app.use(SETTINGS.PATH.POSTS, postsRouter)
app.use(SETTINGS.PATH.TESTING, testingRouter)
app.use(SETTINGS.PATH.USERS, userRouter)
app.use(SETTINGS.PATH.LOGIN, loginRouter)
app.use(SETTINGS.PATH.COMMENTS, commentRouter)