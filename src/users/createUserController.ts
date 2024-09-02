import { Request, Response } from "express"
import { userService } from "./service/userService"
import { HTTP_STATUSES } from "../settings"
import { StatusCode } from "../settings"
import { userQueryRepository } from "./repository/userQueryRepository"

export const createUserController = async (req: Request, res: Response) => {
    const userInfo = await userService.registerUser(req.body)
    if(userInfo.status === StatusCode.BadRequest) {
        res.status(HTTP_STATUSES.BAD_REQUEST_400).json({
            errorsMessages: userInfo.message
        })
        return
    }
    const userView = await userQueryRepository.getUserById(userInfo.userId!)
    res.status(HTTP_STATUSES.CREATED_201).json(userView)
}
