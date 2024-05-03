import { HTTP_STATUSES } from "../settings"
import { Request, Response } from "express"
import { db } from "../db/db"

export const deleteTestingController = (req: Request, res: Response): void => {
    db.videos = [];
    res.status(HTTP_STATUSES.NO_CONTENT_204).json({
        message: 'All data is deleted'
    });
}