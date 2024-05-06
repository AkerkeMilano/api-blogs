import { Request, Response } from "express"
import { HTTP_STATUSES } from "../settings"

import { postBlogsRepository } from "./postBlogsRepository"

export const postBlogsController = (req: Request, res: Response) => {
    const blog = postBlogsRepository.create(req.body)

    res.status(HTTP_STATUSES.CREATED_201).json(blog)
}
