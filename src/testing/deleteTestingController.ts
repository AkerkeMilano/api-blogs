import { HTTP_STATUSES } from "../settings"
import { Request, Response } from "express"
import { dbBlogs } from "../db/dbBlogs";

export const deleteTestingController = (req: Request, res: Response): void => {
    dbBlogs.blogs = [];
    res.status(HTTP_STATUSES.NO_CONTENT_204).json({
        message: 'All data is deleted'
    });
}