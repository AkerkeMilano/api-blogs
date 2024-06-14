import { Request, Response } from "express";
import { createPostForBlogRepository } from "./createPostForBlogRepository"
import { HTTP_STATUSES } from "../settings";

export const createPostForBlogController = async (req: Request, res: Response) => {
    const blogId = req.params.blogId;
    const post = req.body;
    const createdPost = await createPostForBlogRepository(post, blogId)
    res.status(HTTP_STATUSES.OK_200).json(createdPost)
}