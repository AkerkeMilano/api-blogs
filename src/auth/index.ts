import { Router } from "express";
import { loginUser, registerUser, confirmEmail, resendConfirmationCode, genRefreshToken, logout, getUserInfo } from "./authController";
import { loginInputValidators } from "../middlewares/userValidator";
import { userInputValidators } from "../middlewares/userValidator";
import { emailCodeInputValidators, emailInputValidators } from "../middlewares/emailCodeValidators";
import { inputCheckErrorsMiddleware } from "../middlewares/blogValidator";
import { authUserMiddleware } from './../middlewares/authUserMiddleware';
import { requestCountLimiter } from "../middlewares/requestCountMiddleware";
export const authRouter = Router()

authRouter.post('/login', requestCountLimiter, loginInputValidators, inputCheckErrorsMiddleware, loginUser)
authRouter.post('/refresh-token', requestCountLimiter, requestCountLimiter, genRefreshToken)
authRouter.post('/registration', requestCountLimiter, userInputValidators, inputCheckErrorsMiddleware, registerUser)
authRouter.post('/registration-confirmation', requestCountLimiter, emailCodeInputValidators, inputCheckErrorsMiddleware, confirmEmail)
authRouter.post('/registration-email-resending', requestCountLimiter, emailInputValidators, inputCheckErrorsMiddleware, resendConfirmationCode)
authRouter.post('/logout', requestCountLimiter, logout)
authRouter.get('/me', requestCountLimiter, authUserMiddleware, getUserInfo)