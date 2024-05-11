import { createPostRepository } from "./createPostRepository"
import { Request, Response } from "express"
import { HTTP_STATUSES } from "../settings"

export const findPostController = async (req: Request, res: Response) => {
    const post = await createPostRepository.find(req.params.id)
    console.log("post---------", post)

    if(!post) {
        res.status(HTTP_STATUSES.NOT_FOUND_404).json("Post for passed id doesn't exist")
        return
    }

    res.status(HTTP_STATUSES.OK_200).json(post)
}