import { Request, Response } from "express"
import { authService } from "./authService"
import { StatusCode } from "../settings"
import { HTTP_STATUSES } from "../settings"


export const getUserInfo = async (req: Request, res: Response) => {
    const userInfo = await authService.getUserInfo(req.userId)
    if(!userInfo) {
        res.status(HTTP_STATUSES.UNAUTHORIZED_401).json("Wrong access token")
        return
    }
    res.status(HTTP_STATUSES.OK_200).json(userInfo)
}
export const loginUser = async (req: Request, res: Response) => {
    const deviceName = req.headers['user-agent'];
    const ip = req.ip;
    const userInfo = await authService.loginUser(req.body, deviceName, ip)
    if(userInfo.status === StatusCode.Unauthtorized) {
        res.status(HTTP_STATUSES.UNAUTHORIZED_401).json("Wrong password or login")
        return
    }
    res.cookie('refreshToken', userInfo.refreshToken, {httpOnly: true, secure: true})
    res.status(HTTP_STATUSES.OK_200).json({
        "accessToken": userInfo.token
      })

}

export const registerUser = async (req: Request, res: Response) => {
    const userInfo = await authService.registerUser(req.body)
    if(userInfo.status === StatusCode.BadRequest) {
        res.status(HTTP_STATUSES.BAD_REQUEST_400).json({
            errorsMessages: userInfo.message
        })
        return
    }
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
}

export const confirmEmail = async(req: Request, res: Response) => {
    const result = await authService.confirmEmail(req.body.code)
    if(!result) {
        res.status(HTTP_STATUSES.BAD_REQUEST_400).json({
            errorsMessages:  [{ message: "Code already confirmed", field: "code" }]
        })
        return
    }
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
}

export const resendConfirmationCode = async(req: Request, res: Response) => {
    const result = await authService.resendConfirmationCode(req.body.email)
    if(!result){
        res.status(HTTP_STATUSES.BAD_REQUEST_400).json({
            errorsMessages:  [{ message: "Email already confirmed", field: "email" }]
        })
        return
    }
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
}

export const genRefreshToken = async (req: Request, res: Response) => {
    const prevCookie= req.cookies.refreshToken
    const deviceId = req.deviceId
   
    const tokens = await authService.refreshToken(prevCookie, deviceId)
    if(!tokens){
        res.status(HTTP_STATUSES.UNAUTHORIZED_401).json("Login again")
        return
    }

    res.cookie('refreshToken', tokens.refreshToken, {httpOnly: true, secure: true})
    res.status(HTTP_STATUSES.OK_200).json({
        "accessToken": tokens.token
      })

}

export const logout = async (req: Request, res: Response) => {
    const prevToken= req.cookies.refreshToken
    const deviceId = req.deviceId

    const result = await authService.removeToken(prevToken, deviceId)
    if(!result){
        res.status(HTTP_STATUSES.UNAUTHORIZED_401).json("Login again")
        return
    }
    res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: true
      });

    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
}