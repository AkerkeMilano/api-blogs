import { Request, Response } from "express";
import { HTTP_STATUSES } from "../settings";
import { pagination } from "../helpers";
import { postService } from "./service/postService";
import { postQueryRepository } from "./repository/postQueryRepository";
import { commentService } from "../comments/service/commentService";
import { commentQueryRepository } from "../comments/repository/commentQueryRepository";

export const getAllPosts = async (req: Request, res: Response) => {
    const sanitizedQuery = pagination(req.query as { [key: string]: string | undefined })
    const allPosts = await postQueryRepository.getAllPosts(sanitizedQuery)
    res.status(HTTP_STATUSES.OK_200).json(allPosts)
};

export const getPostById = async (req: Request, res: Response) => {
    const post = await postQueryRepository.findById(req.params.id)
    if(!post) {
        res.status(HTTP_STATUSES.NOT_FOUND_404).json("Post for passed id doesn't exist")
        return
    }
    res.status(HTTP_STATUSES.OK_200).json(post)
};

export const createPost = async (req: Request, res: Response) => {
    const postId = await postService.create(req.body)
    const postInfo = await postQueryRepository.findById(postId)
    res.status(HTTP_STATUSES.CREATED_201).json(postInfo)
}

export const updatePost = async (req: Request, res: Response) => {
    const post = await postService.update(req.params.id, req.body)
    if(!post) {
        res.status(HTTP_STATUSES.NOT_FOUND_404).json("Post for passed id doesn't exist")
        return
    }
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
}

export const deletePost = async (req: Request, res: Response) => {
    const postInfo = await postService.delete(req.params.id)
    if(!postInfo) {
        res.status(HTTP_STATUSES.NOT_FOUND_404).json("Post for passed id doesn't exist")
        return
    }
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
}

export const createComment = async (req: Request, res: Response) => {
    const post = await postQueryRepository.findById(req.params.id)
    if(!post) {
        res.status(HTTP_STATUSES.NOT_FOUND_404).json("Post for passed id doesn't exist")
        return
    }
    const commentId = await commentService.createComment(req.params.id, req.body, req.userId)

    const comment = await commentQueryRepository.getById(commentId!)

    res.status(HTTP_STATUSES.CREATED_201).json(comment)
}

export const getCommentsByPost = async (req: Request, res: Response) => {
    const sanitizedQuery = pagination(req.query as { [key: string]: string | undefined })
    const comments = await postQueryRepository.findCommentsById(req.params.id, sanitizedQuery)
    if(!comments) {
        res.status(HTTP_STATUSES.NOT_FOUND_404).json("Post for passed id doesn't exist")
        return
    }
    res.status(HTTP_STATUSES.OK_200).json(comments)
}