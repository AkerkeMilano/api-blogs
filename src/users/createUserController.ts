import { Request, Response } from "express"
import { createUserService } from "./createUserService"
import { HTTP_STATUSES } from "../settings"
import { StatusCode } from "../settings"

export const createUserController = async (req: Request, res: Response) => {
    const userInfo = await createUserService.registerUser(req.body)
    if(userInfo.status === StatusCode.BadRequest) {
        res.status(HTTP_STATUSES.BAD_REQUEST_400).json({
            errorsMessages: userInfo.message
        })
        return
    }
    res.status(HTTP_STATUSES.CREATED_201).json(userInfo.data)
}
