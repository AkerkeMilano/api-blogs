import jwt, { JwtPayload } from 'jsonwebtoken';
import { SETTINGS } from "../../settings"

export const jwtService = {
    async createJWT(payload: any, expiresIn: string){
        const token = jwt.sign(payload, SETTINGS.JWT_SECRET_KEY, {expiresIn: expiresIn})
        return token
    },

    async getUserIdByToken(token: string){
        try {
            const res: any = jwt.verify(token, SETTINGS.JWT_SECRET_KEY)
            return res.userId
        } catch(e) {
            console.log("JWT error", e)
            return null
        }
    },
    async isTokenNotExpired(token: string) {
        try {
            jwt.verify(token, SETTINGS.JWT_SECRET_KEY)
            return true
        } catch(err){
            return false
        }
    },

    async getPayloadByToken(token: string){
        try {
            const res: any = jwt.verify(token, SETTINGS.JWT_SECRET_KEY)
            return res
        } catch(e) {
            console.log("JWT error", e)
            return null
        }
    },
    async getIssuedExpDate(token: string) {
        const decoded = jwt.decode(token);

        if (typeof decoded === 'object' && decoded !== null && 'exp' in decoded && 'iat' in decoded) {
            const payload = decoded as JwtPayload;

            if (payload.exp && payload.iat) {
                const expiresAt = payload.exp;
                const issuedAt = payload.iat;
                
                const expiresAtDate = new Date(expiresAt * 1000);
                const issuedAtDate = new Date(issuedAt * 1000);
                return {
                    issuedAt: issuedAtDate.toISOString(),
                    expiresAt: expiresAtDate.toISOString()
                }
            }
        }
        return {
            issuedAt: null,
            expiresAt: null
        }

    }
}

//verifyToken