import { ObjectId } from "mongodb"
export type CommentTypeId = {
    id: string,
    content: string,
    commentatorInfo: {
        userId: string,
        userLogin: string
    },
    createdAt: string
}

export type CommentType_Id = {
    _id: ObjectId,
    content: string,
    commentatorInfo: {
        userId: string,
        userLogin: string
    },
    createdAt: string
}

export type CommentInputType = {
    content: string
}