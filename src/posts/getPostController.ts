import { Request, Response } from "express";
import { getPostRepository } from "./getPostRepository";
import { HTTP_STATUSES } from "../settings";
import { pagination } from "../helpers";

export const getPostController = async (req: Request, res: Response) => {
    const sanitizedQuery = pagination(req.query as { [key: string]: string | undefined })
    const allPosts = await getPostRepository.getAllPosts(sanitizedQuery)
    res.send('User list');
    //res.status(HTTP_STATUSES.OK_200).json(allPosts)

}