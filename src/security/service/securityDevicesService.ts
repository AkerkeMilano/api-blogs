import { jwtService } from "../../auth/jwt/jwtService"
import { securityDevicesRepository } from "../repository/securityDevicesRepository"
import { StatusCode } from "../../settings"

export const securityDevicesService = {
    async getAllDevices(refreshToken: string) {
        const isValidToken = await jwtService.isTokenNotExpired(refreshToken)
        if(!isValidToken) return null
        const {deviceId, userId} = await jwtService.getPayloadByToken(refreshToken) 
        const devicesList = await securityDevicesRepository.getAllDevicesForUser(userId)

        const updatedDevicesList = devicesList.map(device => {
            return {
                ip: device.ip,
                title: device.deviceName,
                lastActiveDate: device.exp,
                deviceId: device.deviceId
            }
        })
        return updatedDevicesList
    },
    async deleteDevices(refreshToken: string) {
        const isValidToken = await jwtService.isTokenNotExpired(refreshToken)
        if(!isValidToken) return null
        const {deviceId, userId} = await jwtService.getPayloadByToken(refreshToken)
        const isRemoveDevices = await securityDevicesRepository.deleteAllOtherDevices(deviceId)
        return isRemoveDevices
    },
    async deleteDeviceById(refreshToken: string, deviceIdToDel: string) {
        const isValidToken = await jwtService.isTokenNotExpired(refreshToken)
        if(!isValidToken) return StatusCode.Unauthtorized
        const {deviceId, userId} = await jwtService.getPayloadByToken(refreshToken)
        const deviceToDel = await securityDevicesRepository.getDeviceById(deviceIdToDel)
        if(!deviceToDel) return StatusCode.NotFound
        if(deviceToDel.userId !== userId){
            return StatusCode.Forbidden
        }
        const isDeviceRemoved = await securityDevicesRepository.deleteDeviceById(deviceIdToDel)
        return deviceToDel
    }
}

