export type BlogType = {
    name: string,
    description: string,
    websiteUrl: string,
    createdAt: string,
    isMembership: boolean
}

export type BlogTypeId = {
    _id: string,
    name: string,
    description: string,
    websiteUrl: string,
    createdAt: string,
    isMembership: boolean
}

export type FullPostType = {
    id: string,
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
    blogName: string | undefined
}
export type PostType = {
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
}

const blog1: BlogType = {
    name: "About IT and AI",
    description: "This blogs tells about new skills required",
    websiteUrl: "https://blog.logrocket.com/",
    createdAt: '2024-05-13T12:34:52.634Z',
    isMembership: true
}

const blog2: BlogType = {
    name: "Fitness and sport",
    description: "This blogs tells about activities for every day",
    websiteUrl: "https://blog.logrocket.com/",
    createdAt: '2024-05-13T12:34:52.634Z',
    isMembership: true
}

const post1: FullPostType = {
    id: "333r3r3",
    title: "Hello",
    shortDescription: "This is description of my state",
    content: "About greeting",
    blogId: "998dff9",
    blogName: "About IT and AI"
}

const post2: FullPostType = {
    id: "bfhtr666",
    title: "Killsddf",
    shortDescription: "This is description of my gergr",
    content: "About greeting ferfer",
    blogId: "t54t555",
    blogName: "About IT and AI"
}

export type DBType = {
    blogs: BlogType[],
    posts: FullPostType[]
}

export const db = {
    blogs: [blog1, blog2],
    posts: [post1, post2]
}

export const setDB = (dataset?: Partial<DBType>) => {
    if(!dataset) {
        db.blogs = []
        db.posts = []
        return
    }
    if(dataset.blogs){
        db.blogs = dataset.blogs || db.blogs
    } 
    if(dataset.posts){
        db.posts = dataset.posts || db.posts
    }
}