import { ObjectId } from "mongodb"

export type InputBlogType = {
    name: string,
    description: string,
    websiteUrl: string
}

export type BlogTypeId = {
    id: string,
    name: string,
    description: string,
    websiteUrl: string,
    createdAt: string,
    isMembership: boolean
}

export type BlogType_Id = {
    _id: ObjectId,
    name: string,
    description: string,
    websiteUrl: string,
    createdAt: string,
    isMembership: boolean
}

export type ErrorType = {
    error: string
}


 