import { ObjectId } from "mongodb"

export type InputUserType = {
    login: string,
    password: string,
    email: string
}

export type EmailConfirmType = {
    confirmationCode: string,
    expirationDate: Date,
    isConfirmed: boolean
}
export type UserEntityType = {
    login: string,
    password: string,
    email: string,
    createdAt: string,
    emailConfirmation: EmailConfirmType
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