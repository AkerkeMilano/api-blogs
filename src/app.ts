import express from 'express'
import {SETTINGS} from "./settings"
import { blogsRouter } from './blogs'
//test
export const app = express()
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello, second homework')
})

app.use(SETTINGS.PATH.BLOGS, blogsRouter)
