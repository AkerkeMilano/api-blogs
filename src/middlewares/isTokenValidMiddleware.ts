import { Request, Response, NextFunction } from "express"
import { jwtService } from "../auth/jwt/jwtService"
import { authQueryRepository } from "../auth/authQueryRepository"
import { HTTP_STATUSES } from "../settings"
export const isTokenValidMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    
    const prevRefreshToken= req.cookies.refreshToken
    try {
        const isTokenValid = await jwtService.isTokenNotExpired(prevRefreshToken)
        if(!isTokenValid) throw Error()
        const { deviceId, userId } = await jwtService.getPayloadByToken(prevRefreshToken)
        if(!userId) throw Error()
        const { issuedAt } = await jwtService.getIssuedExpDate(prevRefreshToken)
        const device = await authQueryRepository.getDeviceById(deviceId)
        if(!device) throw Error()
        if(device!.iat !== issuedAt) throw Error()
            
        req.deviceId = deviceId
        return next()
    } catch(e) {
        return res.status(HTTP_STATUSES.UNAUTHORIZED_401).json({})
        }

}