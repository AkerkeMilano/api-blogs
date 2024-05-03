
export type InputVideoType = {
    id: number,
    title: string,
    author: string,
    canBeDownloaded: boolean,
    minAgeRestriction: number | null,
    createdAt: string,
    publicationDate: string,
    availableResolutions: string[]
}

export type PostVideoType = {
    title: string,
    author: string,
    availableResolutions: string[]
}

export type FindByIdType = {
    id: string
}
export enum Resolutions {
    P144 = "P144",
    P240 = "P240",
    P360 = "P360",
    P480 = "P480",
    P720 = "P720",
    P1080 = "P1080",
    P1440 = "P1440",
    P2160  = "P2160"
}

type ErrorMessage = {
    message: string,
    field: string
}

export type OutputErrorsType = {
    errorsMessages: ErrorMessage[]
}