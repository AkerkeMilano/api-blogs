import { Request, Response } from "express"
import { HTTP_STATUSES } from "../settings"

import { postBlogsRepository } from "./postBlogsRepository"
import { ObjectId } from 'mongodb';

export const findBlogsController = async (req: Request, res: Response) => {
    const blog = await postBlogsRepository.findForOutput(new ObjectId(req.params.id))

    if(!blog) {
        res.status(HTTP_STATUSES.NOT_FOUND_404)
        .json("Blog for passed id doesn't exist")
        return
    }
    res.status(HTTP_STATUSES.OK_200).json(blog)

}