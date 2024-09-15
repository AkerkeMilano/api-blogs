import { deviceCollection } from "../../db/mongo-db"

const nowISOString = new Date().toISOString();

export const securityDevicesRepository = {
    async getAllDevicesForUser(userId: string) {
        const devices = await deviceCollection.find({
            userId: userId,
            exp: { $gt: nowISOString }
        }).toArray()
        return devices
    },
    async deleteAllOtherDevices(deviceId: string) {
        const removedDevices = await deviceCollection.deleteMany({
            deviceId: { $nin: [deviceId]}
        })
        return removedDevices.acknowledged
    },
    async deleteDeviceById(deviceId: string) {
        const removedDevice = await deviceCollection.deleteOne({
            deviceId: deviceId
        })
        return removedDevice.acknowledged
    },
    async getDeviceById(deviceId: string) {
        const device = await deviceCollection.findOne({
            deviceId: deviceId,
            exp: { $gt: nowISOString }
        })
        return device
    }
}