import { Request, Response } from "express"
import { HTTP_STATUSES } from "../settings"

import { putPostRepository } from "./putPostRepository"
import { ObjectId } from 'mongodb';

export const putPostController = async (req: Request, res: Response) => {
    const post = await putPostRepository.update(new ObjectId(req.params.id), req.body)
    if(post.error) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        return
    }
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
}