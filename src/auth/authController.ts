import { Request, Response } from "express"
import { authService } from "./authService"
import { StatusCode } from "../settings"
import { HTTP_STATUSES } from "../settings"
import { jwtService } from "./jwt/jwtService"

export const loginUser = async (req: Request, res: Response) => {
    const userInfo = await authService.loginUser(req.body)
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
   
    const tokens = await authService.refreshToken(prevCookie)
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
    const result = await await authService.removeToken(prevToken)
    if(!result){
        res.status(HTTP_STATUSES.UNAUTHORIZED_401).json("Login again")
        return
    }
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
}