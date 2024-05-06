import {Router} from 'express'
import { getBlogsController } from './getBlogsController' 
import { postBlogsController } from './postBlogsController'
import { findBlogsController } from './findBlogsController'
import { updateBlogsController } from './updateBlogsController'
import { deleteBlogsController } from './deleteBlogsController'

export const blogsRouter = Router()
 
blogsRouter.get('/', getBlogsController)
blogsRouter.post('/', postBlogsController)
blogsRouter.get('/:id',findBlogsController )
blogsRouter.put('/:id', updateBlogsController)
blogsRouter.delete('/:id', deleteBlogsController)

// videosRouter.post('/', createVideoController)
// videosRouter.get('/:id', findVideoController)
// videosRouter.put('/:id', putVideoController)
// videosRouter.delete('/:id', deleteVideoController)
 