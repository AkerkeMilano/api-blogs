import { Request, Response } from "express"
import { HTTP_STATUSES } from "../settings"
import { getBlogsRepository } from "./getBlogsRepository"

export const getBlogsController = async (req: Request, res: Response) => {
    const blogList = await getBlogsRepository.getAllBlogs()
    res.status(HTTP_STATUSES.OK_200).json(blogList)
}