import {db} from '../db/db'
import { Request, Response } from "express"
import { HTTP_STATUSES } from '../settings'
import { FindByIdType, InputVideoType } from '../db/video-db-type'
 
export const deleteVideoController = (req: Request<FindByIdType>, res: Response<InputVideoType | string>): void => {
    const video = db.videos.find(v => v.id === +req.params.id)
    if(!video) {
        res
            .status(HTTP_STATUSES.NOT_FOUND_404)
            .json("Video for passed id doesn't exist")
        return
    }
    db.videos = db.videos.filter(v => v.id !== +req.params.id)
    res.status(HTTP_STATUSES.NO_CONTENT_204).json("Video was deleted")
}
 