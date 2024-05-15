import { createPostRepository } from "./createPostRepository"
import { Request, Response } from "express"
import { HTTP_STATUSES } from "../settings"
import { ObjectId } from 'mongodb';

export const findPostController = async (req: Request, res: Response) => {
    const post = await createPostRepository.findMapOutput(new ObjectId(req.params.id))

    if(!post) {
        res.status(HTTP_STATUSES.NOT_FOUND_404).json("Post for passed id doesn't exist")
        return
    }

    res.status(HTTP_STATUSES.OK_200).json(post)
}