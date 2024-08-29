export type InputPostType = {
    title: string,
    shortDescription: string,
    content: string,
    blogId: string
}

export type PostViewType = {
    id: string,
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
    blogName: string | undefined,
    createdAt: string
}

export type PostEntityType = {
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
    blogName: string | undefined,
    createdAt: string
}

export type PostPaginationViewType = {
    pagesCount: number,
    page: number,
    pageSize: number,
    totalCount: number,
    items: PostViewType[]
}
export type ErrorType = {
    error: string
}

