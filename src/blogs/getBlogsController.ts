import { Request, Response } from "express"
import { HTTP_STATUSES } from "../settings"

import { getBlogsRepository } from "./getBlogsRepository"

export const getBlogsController = (req: Request, res: Response) => {
    const blogList = getBlogsRepository.getAllBlogs()

    res.status(HTTP_STATUSES.OK_200).json(blogList)
}