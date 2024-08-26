import { Request, Response, NextFunction } from "express"
import { HTTP_STATUSES } from "../settings"
import { jwtService } from "../login/jwt/jwtService"
import { userRepository } from "../users/repository/userRepository"
import { UserType_Id } from "../users/types"

export const authUserMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const auth = req.headers.authorization
    console.log("auth-------", auth)

    if(!auth){
        res
            .status(HTTP_STATUSES.UNAUTHORIZED_401)
            .json({})
        return
    }
    const token = auth.split(' ')[1]
    try {
        const userId = await jwtService.getUserIdByToken(token)
        if(!userId) throw Error()
        const user = await userRepository.getById(userId)
        if(user) {
            req.user = user
            return next()
        }
    }catch(e) {
        return res
        .status(HTTP_STATUSES.UNAUTHORIZED_401)
        .json({})
    }
}