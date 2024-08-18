import { Router } from "express";

import { createUserController } from "./createUserController";
import { getUserController } from "./getUserController";
import { authMiddleware } from "../middlewares/authBlogMiddleware";

export const userRouter = Router();

userRouter.get('/', getUserController)
userRouter.post('/', createUserController)