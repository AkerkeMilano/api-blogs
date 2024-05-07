import {body, validationResult} from 'express-validator'
import { Request, Response, NextFunction } from 'express'
import { HTTP_STATUSES } from '../settings'

const postNameInputValidator = body('name')
.isString().withMessage('name should be String')
.isLength({ max: 15}).withMessage('name length should be less than 15')
const postDescriptionValidator = body('description').isString()
.isLength({ max: 500}).withMessage('description length should be less than 500')
const postWebsiteUrlValidator = body('websiteUrl').isString()
.isLength({ max: 100}).withMessage('websiteUrl length should be less than 100')
.custom(value => {
    const pattern = new RegExp('^https://([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$')
    return pattern.test(value)
}).withMessage('websiteUrl is not satisfied with rules')


export const postInputValidators = [
    postNameInputValidator,
    postDescriptionValidator,
    postWebsiteUrlValidator
]

export const inputCheckErrorsMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const e = validationResult(req)

    if(!e.isEmpty()) {
        const eArray = e.array({onlyFirstError: true}) as { path: string, msg: string }[]

        res
        .status(HTTP_STATUSES.BAD_REQUEST_400)
        .json({
            errorMessages: eArray.map(x => ({
                field: x.path,
                message: x.msg
            }))

        })
        return
    }
    next()
}