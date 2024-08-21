import { Request, Response } from "express"
import { HTTP_STATUSES } from "../settings";
import { userService } from "./service/userService";
import { pagination } from "../helpers";
import { userQueryRepository } from "./repository/userQueryRepository";
export const getUserController = async (req: Request, res: Response) => {
    const sanitizedQuery = pagination(req.query as { [key: string]: string | undefined })

    const users = await userQueryRepository.getAllUsers(sanitizedQuery);
    res.status(HTTP_STATUSES.OK_200).json(users)
}