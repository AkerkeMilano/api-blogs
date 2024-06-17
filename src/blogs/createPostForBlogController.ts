import { Request, Response } from "express";
import { createPostForBlogRepository } from "./createPostForBlogRepository"
import { HTTP_STATUSES } from "../settings";

export const createPostForBlogController = async (req: Request, res: Response) => {
    const blogId = req.params.blogId;
    if(!blogId) {
        res.status(HTTP_STATUSES.NOT_FOUND_404).json("Blog id is not found")
        return
    }
    const post = req.body;
    const createdPost = await createPostForBlogRepository(post, blogId)

    if(!createdPost) {
        res.status(HTTP_STATUSES.NOT_FOUND_404).json("Blog id is not found")
        return
    }

    res.status(HTTP_STATUSES.CREATED_201).json(createdPost)
}