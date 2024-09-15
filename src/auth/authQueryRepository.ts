import { deviceCollection } from "../db/mongo-db"

export const authQueryRepository = {
    async getDeviceById(deviceId: string){
        const res = await deviceCollection.findOne({ deviceId: deviceId})
        return res
    }
}