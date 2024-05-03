import {db} from '../db/db'
import { Request, Response } from "express"
import { HTTP_STATUSES } from '../settings'
import { InputVideoType, PostVideoType, Resolutions, OutputErrorsType } from '../db/video-db-type'
import { isIsoDate } from '../helpers'


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

    if(video.canBeDownloaded && typeof video.canBeDownloaded !== "boolean") {
        errors.errorsMessages.push({
            message: 'error!!!',
            field: 'canBeDownloaded'
        }) 
    }
    if(video.minAgeRestriction && (typeof video.minAgeRestriction !== "number" || video.minAgeRestriction < 1 || video.minAgeRestriction > 18)) {
        errors.errorsMessages.push({
            message: 'error!!!',
            field: 'minAgeRestriction'
        })
    }
    
    if(video.publicationDate && !isIsoDate(video.publicationDate)) {
        errors.errorsMessages.push({
            message: 'error!!!',
            field: 'publicationDate'
        })
    }
    return errors
}

export const putVideoController = (req: Request<InputVideoType>, res: Response<OutputErrorsType | InputVideoType | string>) => {
    
    //const videoIndex: number  = db.videos.findIndex(v => v.id === +req.params.id)
    const video = db.videos.find(v => v.id === +req.params.id)

    if(!video) {
        res
            .status(HTTP_STATUSES.NOT_FOUND_404)
            .json("Video for passed id doesn't exist")
        return
    }

    const errors = inputValidation(req.body)
    if (errors.errorsMessages.length) {
        res
            .status(HTTP_STATUSES.BAD_REQUEST_400)
            .json(errors)
        return
    }
    db.videos = [...db.videos]
    const updatedVideo: InputVideoType = {
            ...video,
            ...req.body,
            //publicationDate: currDate.toISOString()
        }
    const videoIndex: number  = db.videos.findIndex(v => v.id === +req.params.id)
    db.videos[videoIndex] = updatedVideo
    res
        .status(HTTP_STATUSES.NO_CONTENT_204)
        .json(updatedVideo)
}
