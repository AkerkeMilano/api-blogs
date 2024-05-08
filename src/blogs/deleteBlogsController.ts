import { Request, Response } from "express"
import { HTTP_STATUSES } from "../settings"
import { deleteBlogsRepository } from "./deleteBlogsRepository"

export const deleteBlogsController = async (req: Request, res: Response) => {
    const blog = await deleteBlogsRepository.delete(req.params.id)
    if(!blog) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
    }
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
}