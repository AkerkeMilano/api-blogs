import { Request, Response } from "express"
import { HTTP_STATUSES } from "../settings"
import { deleteBlogsRepository } from "./deleteBlogsRepository"
import { ObjectId } from 'mongodb';

export const deleteBlogsController = async (req: Request, res: Response) => {
    // if(!ObjectId.isValid(req.params.id)){
    //     return res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
    //     // или л.,ой другой статус как по ТЗ
    // }
    const blog = await deleteBlogsRepository.delete(new ObjectId(req.params.id)) //  может быть ошибка из-за приведения к обджект айди
    if(!blog) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        return
    }
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
}