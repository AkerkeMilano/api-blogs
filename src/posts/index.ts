import { Router } from "express";

import { getAllPosts, getPostById, createPost, updatePost, deletePost, createComment, getCommentsByPost } from "./postController";
import { createInputValidators } from "../middlewares/postValidators";
import { commentInputValidators } from "../middlewares/commentValidator";
import { inputCheckErrorsMiddleware } from "../middlewares/blogValidator";
import { authMiddleware } from "../middlewares/authBlogMiddleware";
import { authUserMiddleware } from "../middlewares/authUserMiddleware";
export const postsRouter = Router()

postsRouter.get('/', getAllPosts)
postsRouter.post('/', authMiddleware, createInputValidators, inputCheckErrorsMiddleware, createPost)
postsRouter.get('/:id', getPostById)
postsRouter.put('/:id', authMiddleware, createInputValidators, inputCheckErrorsMiddleware, updatePost)
postsRouter.delete('/:id', authMiddleware, deletePost)

postsRouter.get('/:id/comments', getCommentsByPost)
postsRouter.post('/:id/comments', authUserMiddleware, commentInputValidators,inputCheckErrorsMiddleware, createComment)
