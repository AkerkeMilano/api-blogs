import {body} from 'express-validator'

const loginInputValidator = body('login')
.isLength({ min: 3, max: 10 })
.isString().withMessage('Please provide a valid login')
.notEmpty()
.custom(value => {
    const pattern = new RegExp('^[a-zA-Z0-9_-]*$')
    return pattern.test(value)
})

const passwordInputValidator = body('password')
.isLength({ min: 6, max: 20 })
.isString().withMessage('Please provide a valid password')
.notEmpty()
.withMessage('Password is required.')

const emailInputValidator = body('email')
.isString().withMessage('Please provide a valid email')
.notEmpty().withMessage('Email is required.')
.matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/).withMessage("Email does not match regex")

const loginOrEmailValidator = body('loginOrEmail')
.isString().withMessage('Please provide a valid email or login')
.notEmpty()
.custom(value => {
    const isEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
    if (isEmail) return isEmail;

    const isUsername = /^[a-zA-Z0-9_-]*$/.test(value);
    if (isUsername) return isUsername;
    return false
}).withMessage("Must be a valid email or username")

        
export const userInputValidators = [
    loginInputValidator,
    passwordInputValidator,
    emailInputValidator
]

export const loginInputValidators = [
    loginOrEmailValidator,
    passwordInputValidator
]
