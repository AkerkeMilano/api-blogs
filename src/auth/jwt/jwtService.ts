import jwt from 'jsonwebtoken'
import { SETTINGS } from "../../settings"
import { ObjectId } from 'mongodb'

export const jwtService = {
    async createJWT(userId: ObjectId){
        const token = jwt.sign({ userId: userId}, SETTINGS.JWT_SECRET_KEY, {expiresIn: '1h'})
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
    }
}

//verifyToken