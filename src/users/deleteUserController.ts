import { Request, Response } from "express"
import { HTTP_STATUSES } from "../settings";
import { userService } from "./service/userService";

export const deleteUserController = async (req: Request, res: Response) => { 
    const userInfo = await userService.deleteUser(req.params.id)
    if(!userInfo) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        return
    }
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
}