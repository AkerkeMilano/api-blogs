import { HTTP_STATUSES } from "../settings"
import { Request, Response } from "express"
import { deleteTestingRepository } from "./deleteTestingRepository";

export const deleteTestingController = (req: Request, res: Response): void => {
    deleteTestingRepository.deleteAll()
    res.status(HTTP_STATUSES.NO_CONTENT_204).json({
        message: 'All data is deleted'
    });
}