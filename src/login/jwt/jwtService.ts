import jwt from 'jsonwebtoken'
import { UserType_Id } from "../../users/types"
import { SETTINGS } from "../../settings";
import { ObjectId } from 'mongodb';

export const jwtService = {
    async createJWT(user: UserType_Id){
        const token = jwt.sign({ userId: user._id}, SETTINGS.JWT_SECRET_KEY, {expiresIn: '1h'})
        return token
    },
    async getUserIdByToken(token: string){
        try {
            const res: any = jwt.verify(token, SETTINGS.JWT_SECRET_KEY)
            return new ObjectId(res.userId)
        } catch(e) {
            console.log("JWT error", e)
            return null
        }
    }
}