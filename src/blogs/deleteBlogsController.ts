import { Request, Response } from "express"
import { HTTP_STATUSES } from "../settings"
import { deleteBlogsRepository } from "./deleteBlogsRepository"
import { ObjectId } from 'mongodb';

export const deleteBlogsController = async (req: Request, res: Response) => {
    const blog = await deleteBlogsRepository.delete(new ObjectId(req.params.id))
    if(!blog) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        return
    }
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
}