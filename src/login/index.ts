import { Router } from "express";
import { loginAuthController } from "./loginAuthController";
import { loginInputValidators } from "../middlewares/userValidator";
import { inputCheckErrorsMiddleware } from "../middlewares/blogValidator";
import { authUserMiddleware } from "../middlewares/authUserMiddleware";
export const loginRouter = Router()

loginRouter.post('/', authUserMiddleware, loginInputValidators, inputCheckErrorsMiddleware, loginAuthController)