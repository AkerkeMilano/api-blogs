import { Request, Response } from "express"
import { securityDevicesService } from "./service/securityDevicesService"
import { HTTP_STATUSES, StatusCode } from "../settings"

export const getAllDevices = async (req: Request, res: Response) => {
    const prevCookie= req.cookies.refreshToken
    const devices = await securityDevicesService.getAllDevices(prevCookie)
    if(!devices){
        res.status(HTTP_STATUSES.UNAUTHORIZED_401).json("Login again")
        return
    }
    res.status(HTTP_STATUSES.OK_200).json(devices)
}

export const deleteAllDevices = async (req: Request, res: Response) => {
    const prevCookie= req.cookies.refreshToken
    const isRemoved = await securityDevicesService.deleteDevices(prevCookie)
    if(!isRemoved){
        res.status(HTTP_STATUSES.UNAUTHORIZED_401).json("Login again")
        return
    }
    res.status(HTTP_STATUSES.NO_CONTENT_204).json("Devices were deleted")
}

export const deleteDeviceById = async (req: Request, res: Response) => {
    const prevCookie= req.cookies.refreshToken
    const delResult = await securityDevicesService.deleteDeviceById(prevCookie, req.params.deviceId)
    if(delResult === StatusCode.Unauthtorized){
        res.status(HTTP_STATUSES.UNAUTHORIZED_401).json("Login again")
        return
    }
    if(delResult === StatusCode.NotFound){
        res.status(HTTP_STATUSES.NOT_FOUND_404).json("Wrong device Id")
        return
    }
    if(delResult === StatusCode.Forbidden){
        res.status(HTTP_STATUSES.FORBIDDEN_403).json("Not your device")
        return
    }
    res.status(HTTP_STATUSES.NO_CONTENT_204).json("Device was deleted")
}