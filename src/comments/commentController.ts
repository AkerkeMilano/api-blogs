import { Request, Response } from "express";
import { commentService } from "./service/commentService";
import { HTTP_STATUSES } from "../settings";
import { commentQueryRepository } from "./repository/commentQueryRepository";
import { StatusCode } from "../settings";

export const getCommentById = async (req: Request, res: Response) => {
    const comment = await commentQueryRepository.getById(req.params.id)
    if(!comment){
        res.status(HTTP_STATUSES.NOT_FOUND_404).json("Comment for passed id doesn't exist")
        return
    }
    res.status(HTTP_STATUSES.OK_200).json(comment)
}

export const deleteComment = async (req: Request, res: Response) => {
    const comment = await commentService.deleteComment(req.params.id, req.userId)
    if(comment.status === StatusCode.NotFound) {
        res.status(HTTP_STATUSES.NOT_FOUND_404).json("Comment for passed id doesn't exist")
        return
    }
    if(comment.status === StatusCode.Forbidden) {
        res.status(HTTP_STATUSES.FORBIDDEN_403).json("Trying to delete not your comment")
        return
    }
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
}

export const updateComment = async (req: Request, res: Response) => {
    const comment = await commentService.updateComment(req.params.id, req.body, req.userId)
    if(comment.status === StatusCode.NotFound) {
        res.status(HTTP_STATUSES.NOT_FOUND_404).json("Comment for passed id doesn't exist")
        return
    }
    if(comment.status === StatusCode.Forbidden) {
        res.status(HTTP_STATUSES.FORBIDDEN_403).json("Trying to update not your comment")
        return
    }
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
}