// import { db, setDB } from "../src/db/db";
// import { dataset1 } from "./datasets";
// import { ADMIN_AUTH, HTTP_STATUSES, SETTINGS } from "../src/settings";
// import { req } from "./test-helpers";
// import { buff } from "../src/settings";
// import { codedAuth } from "../src/settings";

// describe('/blogs', () => {
//     beforeAll(async () => {
//         await req.delete('/testing/all-data')
//     })
//     it('should get empty array', async () => {
//         setDB()
//         const res = await req
//         .get(SETTINGS.PATH.BLOGS)
//         .expect(HTTP_STATUSES.OK_200)
//         expect(res.body.length).toBe(0)
//     })

//     it('should create a new blog post', async () => {
//         const buff = Buffer.from(ADMIN_AUTH, 'utf8')
//         const codedAuth = buff.toString('base64')
//         const newBlog = {
//             name: "About IT and AI",
//             description: "This blog tells about new skills required",
//             websiteUrl: "https://blog.logrocket.com/"
//         }
//         const res = await req.post(SETTINGS.PATH.BLOGS).send(newBlog).set({'authorization': 'Basic ' + codedAuth}).expect(HTTP_STATUSES.CREATED_201)
//     })

//     it('should not create a new blog post with incorrect input', async () => {
//         const buff = Buffer.from(ADMIN_AUTH, 'utf8')
//         const codedAuth = buff.toString('base64')

//         const newBlog = {
//             name: '        ',
//             description: "This blog tells about new skills required",
//             websiteUrl: "https://blog.logrocket.com/"
//         }
//         const res = await req.post(SETTINGS.PATH.BLOGS).send(newBlog).set({'authorization': 'Basic ' + codedAuth}).expect(HTTP_STATUSES.BAD_REQUEST_400)
//     })

//     it('should create since authorized', async () => {
//         const buff = Buffer.from(ADMIN_AUTH, 'utf8')
//         const codedAuth = buff.toString('base64')
//         const newBlog = {
//             name: 'New blog',
//             description: "This blog tells about new skills required",
//             websiteUrl: "https://blog.logrocket.com/"
//         }

//         const res = await req
//             .post(SETTINGS.PATH.BLOGS)
//             .send(newBlog)
//             .set({'authorization': 'Basic ' + codedAuth})
//             .expect(HTTP_STATUSES.CREATED_201)
//     })

//     it('should not create since unauthorized', async () => {
//         const buff = Buffer.from(ADMIN_AUTH, 'utf8')
//         const codedAuth = buff.toString('base64')
//         const newBlog = {
//             name: 'New blog',
//             description: "This blog tells about new skills required",
//             websiteUrl: "https://blog.logrocket.com/"
//         }

//         const res = await req
//             .post(SETTINGS.PATH.BLOGS)
//             .send(newBlog)
//             .set({'authorization': 'Basic ' + codedAuth + 'rgrg'})
//             .expect(HTTP_STATUSES.UNAUTHORIZED_401)
//     })

//     it('should find blog by id', async () => {
//         setDB(dataset1)
//         const res = await req.get(SETTINGS.PATH.BLOGS + '/' + dataset1.blogs[0].id).expect(HTTP_STATUSES.OK_200)
//         expect(res.body.id).toBe(dataset1.blogs[0].id)
//     })

//     it('should not find blog by id', async () => {
//         setDB(dataset1)
//         const res = await req.get(SETTINGS.PATH.BLOGS + '/' + '5555fff55').expect(HTTP_STATUSES.NOT_FOUND_404)

//     })

//     it('should update blog by id', async () => {
//         setDB(dataset1)

//         const newBlog = {
//             name: "updated blog",
//             description: "This blog tells about new skills required",
//             websiteUrl: "https://blog.logrocket.com/"
//         }

//         const buff = Buffer.from(ADMIN_AUTH, 'utf8')
//         const codedAuth = buff.toString('base64')

//         const res = await req.put(SETTINGS.PATH.BLOGS + '/' + dataset1.blogs[0].id).send(newBlog).set({'authorization': 'Basic ' + codedAuth}).expect(HTTP_STATUSES.NO_CONTENT_204)

//     })

//     it('should not update blog by invalid id', async () => {
//         setDB(dataset1)

//         const buff = Buffer.from(ADMIN_AUTH, 'utf8')
//         const codedAuth = buff.toString('base64')

//         const newBlog = {
//             name: "updated blog",
//             description: "This blog tells about new skills required",
//             websiteUrl: "https://blog.logrocket.com/"
//         }

//         const res = await req.put(SETTINGS.PATH.BLOGS + '/655').send(newBlog).set({'authorization': 'Basic ' + codedAuth}).expect(HTTP_STATUSES.NOT_FOUND_404)
//     })

//       it('should delete blog', async () => {
//         setDB(dataset1)

//         const buff = Buffer.from(ADMIN_AUTH, 'utf8')
//         const codedAuth = buff.toString('base64')

//         const res = await req.delete(SETTINGS.PATH.BLOGS + '/' + dataset1.blogs[0].id).set({'authorization': 'Basic ' + codedAuth}).expect(HTTP_STATUSES.NO_CONTENT_204)
//     })

//     it('should not found blog', async () => {
//         setDB(dataset1)

//         const newBlog = {
//             name: "updated blog",
//             description: "This blog tells about new skills required",
//             websiteUrl: "https://blog.logrocket.com/"
//         }

//         const resPut = await req.put(SETTINGS.PATH.BLOGS + '/' + dataset1.blogs[0].id).send(newBlog).set({'authorization': 'Basic ' + codedAuth})
//         const resDelete = await req.delete(SETTINGS.PATH.BLOGS + '/' + dataset1.blogs[0].id).set({'authorization': 'Basic ' + codedAuth})
//         const resGet = await req.get(SETTINGS.PATH.BLOGS + '/' + dataset1.blogs[0].id).expect(HTTP_STATUSES.NOT_FOUND_404)

//         console.log("blog errors--------", resGet.body)
//     })
// })