import { Request, Response } from "express"
import { HTTP_STATUSES } from "../settings"

import { postBlogsRepository } from "./postBlogsRepository"
import { dbBlogs } from "../db/dbBlogs"

export const postBlogsController = async (req: Request, res: Response) => {
    const blog = await postBlogsRepository.create(req.body)
    res.status(HTTP_STATUSES.CREATED_201).json(blog)
}
