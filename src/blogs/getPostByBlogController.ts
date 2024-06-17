import { Request, Response } from "express";
import { HTTP_STATUSES } from "../settings";
import { getPostByBlogRepository } from "./getPostByBlogRepository";
import { pagination } from "../helpers";

export const getPostByBlogController = async (req: Request, res: Response) => {
    const sanitizedQuery = pagination(req.query as { [key: string]: string | undefined })
    const blogId = req.params.blogId
    const allPosts = await getPostByBlogRepository.getAllPosts(sanitizedQuery, blogId)
    if(!allPosts) {
        res.status(HTTP_STATUSES.NOT_FOUND_404).json("Blog id is not found")
        return
    }
    res.status(HTTP_STATUSES.OK_200).json(allPosts)
}