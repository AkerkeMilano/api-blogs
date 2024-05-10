import { setDB, db } from "../src/db/db"
import { dataset1 } from "./datasets";
import { ADMIN_AUTH, HTTP_STATUSES, SETTINGS } from "../src/settings";
import { req } from "./test-helpers";

describe('/posts', () => {
    beforeAll(async () => {
        await req.delete('/testing/all-data')
    })
    it('should get empty array', async () => {
        setDB()
        const res = await req
        .get(SETTINGS.PATH.POSTS)
        .expect(HTTP_STATUSES.OK_200)
        expect(res.body.length).toBe(0)
    })

    it('should create a new post', async () => {
        const buff = Buffer.from(ADMIN_AUTH, 'utf8')
        const codedAuth = buff.toString('base64')

        const newBlog = {
            name: "About IT and AI",
            description: "This blog tells about new skills required",
            websiteUrl: "https://blog.logrocket.com/"
        }
        const blogRes = await req.post(SETTINGS.PATH.BLOGS).send(newBlog).set({'authorization': 'Basic ' + codedAuth})
        const newPost = {
            title: 'This is post about',
            shortDescription: 'fwefwefewfwe',
            content: 'fhtl,hlrt,h gl,rgler,  mkwemfkew',
            blogId: blogRes.body.id,
            blogName: blogRes.body.name
        }

        const postRes = await req.post(SETTINGS.PATH.POSTS).send(newPost).set({'authorization': 'Basic ' + codedAuth}).expect(HTTP_STATUSES.CREATED_201)
    })

    it('should not create a post since input incorrect', async () => {
        const buff = Buffer.from(ADMIN_AUTH, 'utf8')
        const codedAuth = buff.toString('base64')

        const newPost = {
            title: 'This is post about',
            shortDescription: 'length_101-DnZlTI1khUHpqOqCzftIYiSHCV8fKjYFQOoCIwmUczzW9V5K8cqY3aPKo3XKwbfrmeWOJyQgGnlX5sP3aW3RlaRSQx',
            content: 'fhtl,hlrt,h gl,rgler,  mkwemfkew',
            blogId: '12345'
        }

        const postRes = await req.post(SETTINGS.PATH.POSTS).send(newPost).set({'authorization': 'Basic ' + codedAuth}).expect(HTTP_STATUSES.BAD_REQUEST_400)

        console.log(postRes.body)
    })

    it('should find post by id', async () => {
        setDB(dataset1)
        const res = await req.get(SETTINGS.PATH.POSTS + '/' + dataset1.posts[0].id).expect(HTTP_STATUSES.OK_200)

        expect(res.body.id).toBe(dataset1.posts[0].id)
    })

    it('should update post by id', async () => {
        setDB(dataset1)

        const buff = Buffer.from(ADMIN_AUTH, 'utf8')
        const codedAuth = buff.toString('base64')

        const newPost = {
            title: 'jknkn',
            shortDescription: 'fwefwefewfwe',
            content: 'fhtl,hlrt,h gl,rgler,  mkwemfkew',
            blogId: dataset1.blogs[0].id,
            blogName: dataset1.blogs[0].name
        }

        const postRes = await req.put(SETTINGS.PATH.POSTS + '/' + dataset1.posts[0].id).send(newPost).set({'authorization': 'Basic ' + codedAuth}).expect(HTTP_STATUSES.NO_CONTENT_204)

    })

    it('should delete post', async () => {
        setDB(dataset1)

        const buff = Buffer.from(ADMIN_AUTH, 'utf8')
        const codedAuth = buff.toString('base64')

        const res = await req.delete(SETTINGS.PATH.POSTS + '/' + dataset1.posts[0].id).set({'authorization': 'Basic ' + codedAuth}).expect(HTTP_STATUSES.NO_CONTENT_204)
    })
})