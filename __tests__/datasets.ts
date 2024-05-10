import { BlogType } from '../src/db/db'
import { FullPostType } from '../src/db/db'

type DBType = {
    blogs: BlogType[],
    posts: FullPostType[]
}

const blog1: BlogType = {
    id: "t54t555",
    name: "About IT and AI",
    description: "This blogs tells about new skills required",
    websiteUrl: "https://blog.logrocket.com/"
}

const blog2: BlogType = {
    id: "998dff9",
    name: "Fitness and sport",
    description: "This blogs tells about activities for every day",
    websiteUrl: "https://blog.logrocket.com/"
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

export const dataset1: DBType = {
    blogs: [blog1, blog2],
    posts: [post1, post2]
}
