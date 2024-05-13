import { Request, Response, NextFunction } from "express"
import { ADMIN_AUTH, HTTP_STATUSES } from "../settings"

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const auth = req.headers['authorization'] as string // 'Basic xxxx'
    if(!auth) {
        res
            .status(HTTP_STATUSES.UNAUTHORIZED_401)
            .json({})
        return
    }

    const buff = Buffer.from(ADMIN_AUTH, 'utf8')
    const codedAuth = buff.toString('base64')

    if(auth.slice(6) !== codedAuth || auth.slice(0, 5) !== 'Basic') {
        res
            .status(HTTP_STATUSES.UNAUTHORIZED_401)
            .json({ message: 'Unauthorized person' })
        return
    }
    //test

    next()
}