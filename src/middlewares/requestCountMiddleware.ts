import { Request, Response, NextFunction } from "express"
import { HTTP_STATUSES } from "../settings";
const requestCounts: { [key: string]: number[] } = {};

export const requestCountLimiter = (req: Request, res: Response, next: NextFunction) => {
    const ip = (typeof req.ip === 'string' && req.ip) ||
    (Array.isArray(req.headers['x-forwarded-for']) ? req.headers['x-forwarded-for'][0] : req.headers['x-forwarded-for']) || 'unknown'
    const now = Date.now()

    if(!requestCounts[ip]){
        requestCounts[ip] = []
    }

    requestCounts[ip] = requestCounts[ip].filter(timestamp => now - timestamp < 10000);

    if (requestCounts[ip].length >= 5) {
      res.status(HTTP_STATUSES.TOO_MANY_REQUESTS_429).send('Too many requests. Please try again later.')
      return
    }
    requestCounts[ip].push(now);

    next()
}