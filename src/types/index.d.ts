import { UserType_Id } from "../users/types";
import { Request } from 'express';

declare global {
    declare namespace Express {
        export interface Request {
            user: UserType_Id
        }
    }
}