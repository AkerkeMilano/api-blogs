import {Router} from 'express'
import {getVideosController} from './getVideosController'
import {createVideoController} from './createVideoController'
import {findVideoController} from './findVideoController'
import { putVideoController } from './putVideoController'
import {deleteVideoController} from './deleteVideoController'
 
export const videosRouter = Router()
 
videosRouter.get('/', getVideosController)
videosRouter.post('/', createVideoController)
videosRouter.get('/:id', findVideoController)
videosRouter.put('/:id', putVideoController)
videosRouter.delete('/:id', deleteVideoController)
 