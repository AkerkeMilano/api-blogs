import { setDB } from "../src/db/dbBlogs";
import { dataset1 } from "./datasets";
import { HTTP_STATUSES, SETTINGS } from "../src/settings";
import { req } from "./test-helpers";

describe('/blogs', () => {
    it('should get empty array', async () => {
        setDB()
        const res = await req
        .get(SETTINGS.PATH.BLOGS)
        .expect(HTTP_STATUSES.OK_200)

        console.log("body---------", res.body)
        expect(res.body.length).toBe(0)
    })

    it('should create a new blog post', async () => {
        const newBlog = {
            name: "About IT and AI",
            description: "This blog tells about new skills required",
            websiteUrl: "https://blog.logrocket.com/"
        }
        const res = await req.post(SETTINGS.PATH.BLOGS).send(newBlog).expect(HTTP_STATUSES.CREATED_201)
    })

    it('should find blog by id', async () => {
        setDB(dataset1)
        const res = await req.get(SETTINGS.PATH.BLOGS + '/' + dataset1.blogs[0].id).expect(HTTP_STATUSES.OK_200)
        expect(res.body.id).toBe(dataset1.blogs[0].id)
    })

    it('should not find blog by id', async () => {
        setDB(dataset1)
        const res = await req.get(SETTINGS.PATH.BLOGS + '/' + '5555fff55').expect(HTTP_STATUSES.NOT_FOUND_404)

    })

    it('should update blog by id', async () => {
        setDB(dataset1)

        const newBlog = {
            name: "updated blog",
            description: "This blog tells about new skills required",
            websiteUrl: "https://blog.logrocket.com/"
        }

        const res = await req.put(SETTINGS.PATH.BLOGS + '/' + dataset1.blogs[0].id).send(newBlog).expect(HTTP_STATUSES.NO_CONTENT_204)

    })

    it('should not update blog by invalid id', async () => {
        setDB(dataset1)

        const newBlog = {
            name: "updated blog",
            description: "This blog tells about new skills required",
            websiteUrl: "https://blog.logrocket.com/"
        }

        const res = await req.put(SETTINGS.PATH.BLOGS + '/655').send(newBlog).expect(HTTP_STATUSES.NOT_FOUND_404)
    })

      it('should delete blog', async () => {
        setDB(dataset1)

        const res = await req.delete(SETTINGS.PATH.BLOGS + '/' + dataset1.blogs[0].id).expect(HTTP_STATUSES.NO_CONTENT_204)
    })
})