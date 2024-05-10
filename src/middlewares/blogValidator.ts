import {body, validationResult} from 'express-validator'
import { Request, Response, NextFunction } from 'express'
import { HTTP_STATUSES } from '../settings'

const postNameInputValidator = body('name')
.isString().withMessage('name should be string')
.isLength({ max: 15}).withMessage('name is too long')
.notEmpty()
.custom(value => {
    return /[a-z]/i.test(value)
}).withMessage('name should contain letters')
const postDescriptionValidator = body('description')
.isString().withMessage('description should be string')
.isLength({ max: 500}).withMessage('description is too long')
.notEmpty()
.custom(value => {
    return /[a-z]/i.test(value)
}).withMessage('description should contain letters')

const postWebsiteUrlValidator = body('websiteUrl')
.isString().withMessage('websiteUrl should be string')
.isLength({ max: 100}).withMessage('website url is too long')
.custom(value => {
    const pattern = new RegExp('^https://([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$')
    return pattern.test(value)
}).withMessage('website url does not match the template')
.notEmpty()

// export const paramIdValidator = param('id').exists()
// .custom(async (id) => {
//     const blog = await postBlogsRepository.find(id)
//     if(!blog) {
//         throw new Error('no blog with current id')
//     }
//     return !!blog
// })
// .withMessage('no blog with current id')


export const postInputValidators = [
    postNameInputValidator,
    postDescriptionValidator,
    postWebsiteUrlValidator,
]

export const inputCheckErrorsMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const e = validationResult(req)
 
    if(!e.isEmpty()) {
        const eArray = e.array({onlyFirstError: true}) as { path: string, msg: string }[]

        res
        .status(HTTP_STATUSES.BAD_REQUEST_400)
        .json({
            errorsMessages: eArray.map(x => ({
                message: x.msg,
                field: x.path
            }))

        })
        return
    }
    next()
}