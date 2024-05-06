import { BlogType } from '../src/db/dbBlogs'
import { DBType } from '../src/db/dbBlogs'
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

export const dataset1: DBType = {
    blogs: [blog1, blog2],
}
