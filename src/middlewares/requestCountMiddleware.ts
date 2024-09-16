import { Request, Response, NextFunction } from "express"
import { HTTP_STATUSES } from "../settings";
import { apiService } from "../api/apiService";

export const requestCountLimiter = async (req: Request, res: Response, next: NextFunction) => {
    const ip = (typeof req.ip === 'string' && req.ip) ||
    (Array.isArray(req.headers['x-forwarded-for']) ? req.headers['x-forwarded-for'][0] : req.headers['x-forwarded-for']) || 'unknown'
    const url = req.originalUrl;
    const now = new Date();
    const tenSecondsAgo = new Date(now.getTime() - 10000);

    const dto = {
        ip: ip,
        url: url,
        date: now
    }
    const isRequestValid = await apiService.getApiCounts(dto, tenSecondsAgo)
    if(!isRequestValid){
        res.status(HTTP_STATUSES.TOO_MANY_REQUESTS_429).json("Too many request, try later!")
        return
    }

    await apiService.addApi(dto)

    next()
}