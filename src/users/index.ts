import { Router } from "express";

import { createUserController } from "./createUserController";
import { getUserController } from "./getUserController";
import { deleteUserController } from "./deleteUserController";
import { authMiddleware } from "../middlewares/authBlogMiddleware";
import { userInputValidators } from "../middlewares/userValidator";
import { inputCheckErrorsMiddleware } from "../middlewares/blogValidator";
export const userRouter = Router();

userRouter.get('/', authMiddleware, getUserController)
userRouter.post('/', authMiddleware, userInputValidators, inputCheckErrorsMiddleware, createUserController)
userRouter.delete('/:id', authMiddleware, deleteUserController)