import { Request, Response } from "express"
import { loginAuthService } from "./loginAuthService"
import { StatusCode } from "../settings"
import { HTTP_STATUSES } from "../settings"

export const loginAuthController = async (req: Request, res: Response) => {
    const userInfo = await loginAuthService.loginUser(req.body)
    if(userInfo.status === StatusCode.Unauthtorized) {
        res.status(HTTP_STATUSES.UNAUTHORIZED_401).json("Wrong password or login")
        return
    }
    res.status(HTTP_STATUSES.OK_200).json({
        "accessToken": userInfo.token
      })
}