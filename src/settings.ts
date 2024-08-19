import {config} from 'dotenv'
config() // добавление переменных из файла .env в process.env
 
export const SETTINGS = {
    PORT: process.env.PORT || 8000,
    PATH: {
        BLOGS: '/blogs',
        POSTS: '/posts',
        USERS: '/users',
        LOGIN: '/login',
        TESTING: '/testing/all-data'
    },
    MONGO_URL: process.env.MONGO_URL || '',
    DN_NAME: process.env.DN_NAME || '',
    BLOG_COLLECTION_NAME: process.env.BLOG_COLLECTION_NAME || '',
    POST_COLLECTION_NAME: process.env.POST_COLLECTION_NAME || '',
    USER_COLLECTION_NAME: process.env.USER_COLLECTION_NAME || ''
}

export const HTTP_STATUSES = {
    OK_200: 200,
    CREATED_201: 201, 
    NO_CONTENT_204: 204,
    BAD_REQUEST_400: 400,
    NOT_FOUND_404: 404,
    UNAUTHORIZED_401: 401
}

export enum StatusCode {
    Success = '1',
    BadRequest = '2',
    LoginError = '3',
    EmailError = '4',
    Unauthtorized = '5',
    NoContent = '6'
}

export const ADMIN_AUTH = 'admin:qwerty' 

export const buff = Buffer.from(ADMIN_AUTH, 'utf8')
export const codedAuth = buff.toString('base64')
