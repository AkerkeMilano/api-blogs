import { Request, Response } from "express";
import { getPostRepository } from "./getPostRepository";
import { HTTP_STATUSES } from "../settings";

export const getPostController = async (req: Request, res: Response) => {
    const allPosts = await getPostRepository.getAllPosts()
    res.status(HTTP_STATUSES.OK_200).json(allPosts)
}