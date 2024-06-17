import {Router} from 'express'
import { getBlogsController } from './getBlogsController' 
import { postBlogsController } from './postBlogsController'
import { findBlogsController } from './findBlogsController'
import { updateBlogsController } from './updateBlogsController'
import { deleteBlogsController } from './deleteBlogsController'
import { getPostByBlogController } from './getPostByBlogController'
import { createPostForBlogController } from './createPostForBlogController'
import { inputCheckErrorsMiddleware, postInputValidators } from '../middlewares/blogValidator'
import { authMiddleware } from '../middlewares/authBlogMiddleware'
import { postUpdatedValidators } from '../middlewares/postValidators'

export const blogsRouter = Router()
 
blogsRouter.get('/', getBlogsController)
blogsRouter.post('/', authMiddleware, postInputValidators, inputCheckErrorsMiddleware, postBlogsController)
blogsRouter.get('/:id', findBlogsController )
blogsRouter.put('/:id', authMiddleware, postInputValidators, inputCheckErrorsMiddleware, updateBlogsController)
blogsRouter.delete('/:id', authMiddleware, deleteBlogsController)
blogsRouter.get('/:blogId/posts', getPostByBlogController)
blogsRouter.post('/:blogId/posts', authMiddleware, postUpdatedValidators, inputCheckErrorsMiddleware, createPostForBlogController)