import express from 'express'
import {SETTINGS} from "./settings"
import { videosRouter } from './videos'
import { testingRouter } from './testing'
//test
export const app = express()
app.use(express.json()) // добавление ко всем реквестам body и query

app.get('/', (req, res) => {
  res.send('Hello, first homework')
})

app.use(SETTINGS.PATH.VIDEOS, videosRouter)
app.use(SETTINGS.PATH.TESTING, testingRouter)