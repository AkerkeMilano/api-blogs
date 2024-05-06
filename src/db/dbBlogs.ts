export type BlogType = {
    id: string,
    name: string,
    description: string,
    websiteUrl: string
}

export type DBType = {
    blogs: BlogType[]
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

export const dbBlogs = {
    blogs: [blog1, blog2]
}

export const setDB = (dataset?: Partial<DBType>) => {
    if(!dataset) {
        dbBlogs.blogs = []
        return
    }

    dbBlogs.blogs = dataset.blogs || dbBlogs.blogs
}