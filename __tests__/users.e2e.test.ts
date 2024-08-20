import { mongoMemoryServer } from './mongoMemoryConnect'
import { authUser } from './auth'
import { req } from './test-helpers'
import { HTTP_STATUSES, SETTINGS } from '../src/settings';
describe('/users', () => {
    beforeAll(async () => {
        await mongoMemoryServer.connect()
    }),
    afterAll((done) => {
        mongoMemoryServer.disconnect().then(() => done());
    }),
    //create user test
    it('should create a new user', async () => {
        const authUserObj = authUser()
        const newUser = {
            login:"user01",
            password:"qwerty1",
            email:"email1p@gg.cm"
        }
        const response = await req.post(SETTINGS.PATH.USERS).send(newUser).set(authUserObj).expect(HTTP_STATUSES.CREATED_201)
        expect(response.body).toHaveProperty('id');
        expect(response.body.login).toBe(newUser.login);
        expect(response.body.email).toBe(newUser.email);
    }),
    it('should fail to create a new user with incorrect input', async () => {
        const authUserObj = authUser()
        const invalidUser = {
            login:"user01",
            password:"qwerty1",
            email:"email1pgg.cm"
        }
        const response = await req.post(SETTINGS.PATH.USERS).send(invalidUser).set(authUserObj).expect(HTTP_STATUSES.BAD_REQUEST_400)
    }),
    it('should fail to create a new user with the same email', async () => {
        const authUserObj = authUser()
        const newUser = {
            login:"user012",
            password:"qwerty1",
            email:"email1p@gg.cm"
        }
        const response = await req.post(SETTINGS.PATH.USERS).send(newUser).set(authUserObj).expect(HTTP_STATUSES.BAD_REQUEST_400)
    }),
    it('should fail to create a new user since unauthtorized', async () => {
        const newUser = {
            login:"user012",
            password:"qwerty1",
            email:"email1p@gg.cm"
        }
        const response = await req.post(SETTINGS.PATH.USERS).send(newUser).expect(HTTP_STATUSES.UNAUTHORIZED_401)
    }),
    //get user test
    it('should get list of users', async () => {
        const authUserObj = authUser()
        const usersInfo = await req.get(SETTINGS.PATH.USERS).set(authUserObj).expect(HTTP_STATUSES.OK_200)
        expect(usersInfo.body.pagesCount).toBe(1);
        expect(usersInfo.body.page).toBe(1);
        expect(usersInfo.body.pageSize).toBe(10);
        expect(usersInfo.body.totalCount).toBe(1);
    }),
    it('should fail to get list of users since unauth', async () => {
        const usersInfo = await req.get(SETTINGS.PATH.USERS).expect(HTTP_STATUSES.UNAUTHORIZED_401)
    }),
    it('should delete user with id', async () => {
        const authUserObj = authUser()

        const newUser = {
            login:"user0122",
            password:"qwerty1",
            email:"email22p@gg.cm"
        }
        const userInfo = await req.post(SETTINGS.PATH.USERS).send(newUser).set(authUserObj).expect(HTTP_STATUSES.CREATED_201)

        await req.delete(SETTINGS.PATH.USERS + '/' + userInfo.body.id).set(authUserObj).expect(HTTP_STATUSES.NO_CONTENT_204)
    }),
    it('should fail to delete user with id since user with id does not exit', async () => {
        const authUserObj = authUser()

        await req.delete(SETTINGS.PATH.USERS + '/' + '66c453b0adee5a47f037ce62').set(authUserObj).expect(HTTP_STATUSES.NOT_FOUND_404)
    }),
    it('should fail to delete user since unauth', async () => {
        await req.delete(SETTINGS.PATH.USERS + '/66c453b0adee5a47f037ce62').expect(HTTP_STATUSES.UNAUTHORIZED_401)
    })
})