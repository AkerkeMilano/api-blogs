import {db} from '../db/db'
import { Request, Response } from "express"
import { HTTP_STATUSES } from '../settings'
import { InputVideoType } from '../db/video-db-type'
//import {OutputVideoType} from '../input-output-types/video-types'
 

export const getVideosController = (req: Request, res: Response<InputVideoType[]>): void => {
    res.status(HTTP_STATUSES.OK_200).json(db.videos)
}
 