import { Request, Response } from "express"
import { HTTP_STATUSES } from "../settings"
import { getBlogsRepository } from "./getBlogsRepository"
import { pagination } from "../helpers"

export const getBlogsController = async (req: Request, res: Response) => {
    const sanitizedQuery = pagination(req.query as { [key: string]: string | undefined })
    const blogList = await getBlogsRepository.getAllBlogs(sanitizedQuery)
    res.status(HTTP_STATUSES.OK_200).json(blogList)
}