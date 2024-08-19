import { ObjectId } from "mongodb"

export type InputUserType = {
    login: string,
    password: string,
    email: string
}

export type UserType_Id = {
    _id: ObjectId,
    login: string,
    password: string,
    email: string,
    createdAt: string
}

export type UserTypeId = {
    id: string,
    login: string,
    email: string,
    createdAt: string
}

export type ErrorType = {
    error: string
}

export type UserPaginationType = {
    pagesCount: number,
    page: number,
    pageSize: number,
    totalCount: number,
    items: UserTypeId[]
}