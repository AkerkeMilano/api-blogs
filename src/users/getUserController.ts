import { Request, Response } from "express"
import { HTTP_STATUSES } from "../settings";
import { getUserService } from "./getUserService"
import { pagination } from "../helpers";
export const getUserController = async (req: Request, res: Response) => {
    const sanitizedQuery = pagination(req.query as { [key: string]: string | undefined })

    const users = await getUserService.getAll(sanitizedQuery);
    res.status(HTTP_STATUSES.OK_200).json(users)
}