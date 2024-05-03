import {db} from '../db/db'
import { Request, Response } from "express"
import { HTTP_STATUSES } from '../settings'
import { InputVideoType, PostVideoType, Resolutions, OutputErrorsType } from '../db/video-db-type'



const inputValidation = (video: InputVideoType) => {
    const errors: OutputErrorsType = {
        errorsMessages: []
    }

    if (!Array.isArray(video.availableResolutions)
    || video.availableResolutions.find(p => !(p in Resolutions))
    ) {
        errors.errorsMessages.push({
            message: 'error!!!!', field: 'availableResolutions'
        })
    }

    if(typeof video.title !== "string" || video.title.length > 40) {
        errors.errorsMessages.push({
            message: 'error!!!',
            field: 'title'
        })
    }

    if(typeof video.author !== "string" || video.author.length > 20) {
        errors.errorsMessages.push({
            message: 'error!!!',
            field: 'author'
        })
    }

    return errors
}

export const createVideoController = (req: Request, res: Response<InputVideoType | OutputErrorsType>) => {
    
    const errors = inputValidation(req.body)

    if (errors.errorsMessages.length) {
        res
            .status(HTTP_STATUSES.BAD_REQUEST_400)
            .json(errors)
        return
    }
    const currDate = new Date();
    const newVideo: InputVideoType = {
        id: Math.round(Date.now() + Math.random()),
        canBeDownloaded: false,
        minAgeRestriction: null,
        createdAt: currDate.toISOString(),
        publicationDate: new Date((currDate.setDate(currDate.getDate() + 1))).toISOString(),
        ...req.body
    }
    db.videos = [...db.videos, newVideo]
 
    res
        .status(HTTP_STATUSES.CREATED_201)
        .json(newVideo)
}
