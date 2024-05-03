import {req} from './test-helpers'
import {setDB, db} from '../src/db/db'
import { dataset1, Resolutions } from './datasets'
import {HTTP_STATUSES, SETTINGS} from '../src/settings'
import { PostVideoType } from '../src/db/video-db-type'

describe('/videos', () => {
    beforeAll(async () => {
        await req.delete('/testing/all-data')
    })
    it('should get empty array', async () => {
        setDB()
        const res = await req
        .get(SETTINGS.PATH.VIDEOS)
        .expect(HTTP_STATUSES.OK_200)
        expect(res.body.length).toBe(0)
    })
    it('should get not empty array', async () => {
        setDB(dataset1)
 
        const res = await req
            .get(SETTINGS.PATH.VIDEOS)
            .expect(HTTP_STATUSES.OK_200)
  
        
        expect(res.body.length).toBe(1)
        expect(res.body[0]).toEqual(dataset1.videos[0])
    })
    
    it('should create a new video', async () => {
        setDB()
        const newVideo: PostVideoType = {
            title: "About nature",
            author: "Gabrier",
            availableResolutions: ["P144", "P720"]
        }
 
        const res = await req.post(SETTINGS.PATH.VIDEOS).send(newVideo).expect(HTTP_STATUSES.CREATED_201)
        expect(res.body.title).toBe(newVideo.title)
        expect(res.body.author).toBe(newVideo.author)
        expect(res.body.availableResolutions).toEqual(newVideo.availableResolutions)
    })

    it('should not create a new video', async () => {
        setDB()

        const invalidVideo: PostVideoType = {
            title: "About nature",
            author: "Gabriella",
            availableResolutions: ["P144","Invalid","P720"]
        }

        const res = await req.post(SETTINGS.PATH.VIDEOS).send(invalidVideo).expect(HTTP_STATUSES.BAD_REQUEST_400)
        expect(res.body.availableResolutions).not.toEqual(invalidVideo.availableResolutions)
        expect(res.body.errorsMessages[0].field).toBe('availableResolutions')
    })

    it('should return video by Id', async () => {
        setDB(dataset1)
 
        const res = await req
            .get(SETTINGS.PATH.VIDEOS + '/' + dataset1.videos[0].id)
            .expect(HTTP_STATUSES.OK_200)

        expect(res.body).toEqual(dataset1.videos[0])
    })

    it('should not return video by incorrect Id', async () => {
        setDB(dataset1)
 
        const res = await req
            .get(SETTINGS.PATH.VIDEOS + '/1')
            .expect(HTTP_STATUSES.NOT_FOUND_404)
    })

    it('should update video', async () => {
        setDB(dataset1)

        const updateVideo = {
            title: 'Long road',
            author: 'Rebecca',
            canBeDownloaded: true,
            minAgeRestriction: 16,
            publicationDate: new Date(),
            availableResolutions: [Resolutions.P480],
        }
        
        const res = await req
            .put(SETTINGS.PATH.VIDEOS + '/655')
            .send(updateVideo)
            .expect(HTTP_STATUSES.NO_CONTENT_204)
    })

    it('should not update video', async () => {
        setDB(dataset1)

        const updateVideo = {
            "author":"length_21-weqweqweqwq",
            "title":"valid title",
            "availableResolutions":["P240","P720"],"canBeDownloaded":true,
            "minAgeRestriction":15,
            "publicationDate":1995
        }
        
        const res = await req
            .put(SETTINGS.PATH.VIDEOS + '/655')
            .send(updateVideo)
            .expect(HTTP_STATUSES.BAD_REQUEST_400)

        expect(res.body.errorsMessages[0].field).toBe('author')
        expect(res.body.errorsMessages[1].field).toBe('publicationDate')

    })
})
