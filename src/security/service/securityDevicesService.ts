import { jwtService } from "../../auth/jwt/jwtService"
import { securityDevicesRepository } from "../repository/securityDevicesRepository"
import { StatusCode } from "../../settings"

export const securityDevicesService = {
    async getAllDevices(refreshToken: string) {
        const isValidToken = await jwtService.isTokenNotExpired(refreshToken)
        if(!isValidToken) return null
        const {deviceId, userId} = await jwtService.getPayloadByToken(refreshToken) 
        const devicesList = await securityDevicesRepository.getAllDevicesForUser(userId)

        if(devicesList.length === 0) return []

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


// refreshToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NmU3ZTVlZTE4MmI2MTA1MTE4ZTBlNWQiLCJkZXZpY2VJZCI6ImI5MjI1YmU5LWQ2YzAtNDhkOS1hOGY4LWFjNDVhZjNlNTVmNSIsImlhdCI6MTcyNjQ3NDE2OSwiZXhwIjoxNzI2NDc0NDY5fQ.YHkLCKembS2920q4rFJ-Uc_PYwtI8N9sEtlvW1YbVuo

// refreshToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NmU3ZTVlZTE4MmI2MTA1MTE4ZTBlNWQiLCJkZXZpY2VJZCI6IjFkMjVjMTA5LTAzZjAtNDhlYS05MDNiLWY3NjcyNjNlMjZhYiIsImlhdCI6MTcyNjQ3NDIxOCwiZXhwIjoxNzI2NDc0NTE4fQ.RSwhpWXIpUC43Z2phM0TtY_qefSl4cQ-AobEE6JLMoU

//refreshToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NmU3ZTVlZTE4MmI2MTA1MTE4ZTBlNWQiLCJkZXZpY2VJZCI6IjFkYTAzMjU0LWRmMjEtNDZhZi05MDU0LWY2MmE3YmIwYmZiNiIsImlhdCI6MTcyNjQ3NDI0NCwiZXhwIjoxNzI2NDc0NTQ0fQ.b707IoTvjXRQrtYWJW-vfi_FZag9wxb3mYjPBh5W1Vk

//refreshToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NmU3ZTVlZTE4MmI2MTA1MTE4ZTBlNWQiLCJkZXZpY2VJZCI6IjYwY2IyNGQzLTIxMzItNDQwNi04M2UzLTllN2FlOTgzYWMwYyIsImlhdCI6MTcyNjQ3NDI2MSwiZXhwIjoxNzI2NDc0NTYxfQ.Ia9YxU1FIY06RVWNHsjbSbDhaF-uhrzhkJC6T3d2D3Q
