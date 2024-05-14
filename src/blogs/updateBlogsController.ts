import { Request, Response } from "express"
import { HTTP_STATUSES } from "../settings"

import { updateBlogsRepository } from "./updateBlogsRepository"
import { ObjectId } from 'mongodb';

export const updateBlogsController = async (req: Request, res: Response) => {
    const blogId = await updateBlogsRepository.update(new ObjectId(req.params.id), req.body)
    console.log("blogId------", blogId)
    if(!blogId) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        return
    }
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
}