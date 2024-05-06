import { Request, Response } from "express"
import { HTTP_STATUSES } from "../settings"
import { deleteBlogsRepository } from "./deleteBlogsRepository"

export const deleteBlogsController = async (req: Request, res: Response) => {
    const blog = await deleteBlogsRepository.delete(req.params.id)
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
}