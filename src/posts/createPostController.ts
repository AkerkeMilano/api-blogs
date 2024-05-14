import { Request, Response } from "express"
import { createPostRepository } from "./createPostRepository"
import { HTTP_STATUSES } from "../settings"

export const createPostController = async (req: Request, res: Response) => {
    const post = await createPostRepository.create(req.body)
    res.status(HTTP_STATUSES.CREATED_201).json(post)
}