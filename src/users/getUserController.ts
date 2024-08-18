import { Request, Response } from "express"
import { HTTP_STATUSES } from "../settings";
import { getUserService } from "./getUserService"
export const getUserController = async (req: Request, res: Response) => {
    const users = await getUserService.getAll();
    console.log("all users", users)
    //res.status(HTTP_STATUSES.OK_200).json(users)
    res.send('User list');
}