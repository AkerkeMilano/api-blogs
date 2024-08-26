import { Router } from "express";
import { loginAuthController } from "./loginAuthController";
import { loginInputValidators } from "../middlewares/userValidator";
import { inputCheckErrorsMiddleware } from "../middlewares/blogValidator";
export const loginRouter = Router()

loginRouter.post('/', loginInputValidators, inputCheckErrorsMiddleware, loginAuthController)