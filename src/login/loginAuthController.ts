import { Request, Response } from "express"
import { loginAuthService } from "./loginAuthService"
import { StatusCode } from "../settings"
import { HTTP_STATUSES } from "../settings"

export const loginAuthController = async (req: Request, res: Response) => {
    const userInfo = await loginAuthService.loginUser(req.body)
    if(userInfo.status === StatusCode.Unauthtorized) {
        res.sendStatus(HTTP_STATUSES.UNAUTHORIZED_401)
        return
    }
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
}