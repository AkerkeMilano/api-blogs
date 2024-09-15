import { Router } from "express";
import { getAllDevices, deleteAllDevices, deleteDeviceById } from "./securityDevicesController";
getAllDevices
export const securityDevicesRouter = Router()

securityDevicesRouter.get('/devices', getAllDevices)
securityDevicesRouter.delete('/devices', deleteAllDevices)
securityDevicesRouter.delete('/devices/:id', deleteDeviceById)