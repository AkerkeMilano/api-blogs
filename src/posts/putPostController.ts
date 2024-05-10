import { Request, Response } from "express"
import { HTTP_STATUSES } from "../settings"

import { putPostRepository } from "./putPostRepository"

export const putPostController = async (req: Request, res: Response) => {
    const post = await putPostRepository.update(req.params.id, req.body)
    if(!post) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        return
    }
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
}