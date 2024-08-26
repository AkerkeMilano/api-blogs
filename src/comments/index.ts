import { Router } from "express";
import { getCommentById, deleteComment, updateComment } from "./commentController";
import { authUserMiddleware } from "../middlewares/authUserMiddleware";
import { commentInputValidators } from './../middlewares/commentValidator';
import { inputCheckErrorsMiddleware } from "../middlewares/blogValidator";
export const commentRouter = Router()

commentRouter.get('/:id', getCommentById)
commentRouter.delete('/:id', authUserMiddleware, deleteComment)
commentRouter.put('/:id', authUserMiddleware, commentInputValidators, inputCheckErrorsMiddleware, updateComment)