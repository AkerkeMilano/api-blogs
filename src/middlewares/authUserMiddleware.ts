import { Request, Response, NextFunction } from "express"
import { HTTP_STATUSES } from "../settings"
import { jwtService } from "../auth/jwt/jwtService"
import { userRepository } from "../users/repository/userRepository"
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
        const userId = await jwtService.getUserIdByToken(token) as string
        if(!userId) throw Error()
            //check userId in query repo
        const user = await userRepository.getById(userId)
        if(!user) throw Error()

        req.userId = userId
        return next()
    }catch(e) {
        return res
        .status(HTTP_STATUSES.UNAUTHORIZED_401)
        .json({})
    }
}