import { Request, Response } from "express"
import { HTTP_STATUSES } from "../settings"
import { deletePostRepository } from "./deletePostRepository"

export const deletePostController = async (req: Request, res: Response) => {
    const post = await deletePostRepository.delete(req.params.id)
    if(!post) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        return
    }
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
}