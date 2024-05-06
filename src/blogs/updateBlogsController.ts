import { Request, Response } from "express"
import { HTTP_STATUSES } from "../settings"

import { updateBlogsRepository } from "./updateBlogsRepository"

export const updateBlogsController = async (req: Request, res: Response) => {
    const blog = await updateBlogsRepository.update(req.params.id, req.body)
    console.log("blog---------", blog)
    if(!blog) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        return
    }
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
}