import { Router } from "express";
import { loginUser, registerUser, confirmEmail, resendConfirmationCode } from "./authController";
import { loginInputValidators } from "../middlewares/userValidator";
import { userInputValidators } from "../middlewares/userValidator";
import { emailCodeInputValidators, emailInputValidators } from "../middlewares/emailCodeValidators";
import { inputCheckErrorsMiddleware } from "../middlewares/blogValidator";
export const authRouter = Router()

authRouter.post('/login', loginInputValidators, inputCheckErrorsMiddleware, loginUser)
authRouter.post('/registration', userInputValidators, inputCheckErrorsMiddleware, registerUser)
authRouter.post('/registration-confirmation', emailCodeInputValidators, inputCheckErrorsMiddleware, confirmEmail)
authRouter.post('/registration-email-resending', emailInputValidators, inputCheckErrorsMiddleware, resendConfirmationCode)