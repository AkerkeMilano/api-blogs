import { Router } from "express";

import { getPostController } from "./getPostController";
import { createPostController } from "./createPostController";
import { findPostController } from "./findPostController";
import { putPostController } from "./putPostController";
import { createInputValidators } from "../middlewares/postValidators";
import { inputCheckErrorsMiddleware } from "../middlewares/blogValidator";
import { authMiddleware } from "../middlewares/authBlogMiddleware";
import { deletePostController } from "./deletePostController";

export const postsRouter = Router()


postsRouter.get('/', getPostController)
postsRouter.post('/', authMiddleware, createInputValidators, inputCheckErrorsMiddleware, createPostController)
postsRouter.get('/:id', findPostController)
postsRouter.put('/:id', authMiddleware, createInputValidators, inputCheckErrorsMiddleware, putPostController)
postsRouter.delete('/:id', authMiddleware, deletePostController)
