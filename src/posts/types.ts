import { ObjectId } from "mongodb"

export type InputPostType = {
    title: string,
    shortDescription: string,
    content: string,
    blogId: string
}

export type PostTypeId = {
    id: string,
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
    blogName: string | undefined,
    createdAt: string
}

export type PostType_Id = {
    _id: ObjectId,
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
    blogName: string | undefined,
    createdAt: string
}

export type ErrorType = {
    error: string
}