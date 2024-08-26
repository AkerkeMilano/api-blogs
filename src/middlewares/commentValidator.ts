import {body} from 'express-validator'

const commentInputValidator = body('content')
.isLength({ min: 20, max: 300 })
.isString().withMessage('Please provide a valid content')
.notEmpty()

export const commentInputValidators = [
    commentInputValidator
]