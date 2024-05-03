import { Router } from "express";
import { deleteTestingController } from "./deleteTestingController";

export const testingRouter = Router()

testingRouter.delete('/', deleteTestingController);