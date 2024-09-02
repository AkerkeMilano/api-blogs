import {body} from 'express-validator'

const codeInputValidator = body('code')
.isString().withMessage('Please provide a valid code')
.notEmpty()

const emailInputValidator = body('email')
.isString().withMessage('Please provide a valid email')
.notEmpty().withMessage('Email is required.')
.matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/).withMessage("Email does not match regex")

export const emailCodeInputValidators = [
    codeInputValidator
]

export const emailInputValidators = [
    emailInputValidator
]