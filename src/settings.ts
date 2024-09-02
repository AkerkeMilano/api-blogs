import {config} from 'dotenv'
config() // добавление переменных из файла .env в process.env
 
export const SETTINGS = {
    PORT: process.env.PORT || 8000,
    PATH: {
        BLOGS: '/blogs',
        POSTS: '/posts',
        USERS: '/users',
        AUTH: '/auth',
        COMMENTS: '/comments',
        TESTING: '/testing/all-data'
    },
    MONGO_URL: process.env.MONGO_URL || '',
    DN_NAME: process.env.DN_NAME || '',
    BLOG_COLLECTION_NAME: process.env.BLOG_COLLECTION_NAME || '',
    POST_COLLECTION_NAME: process.env.POST_COLLECTION_NAME || '',
    USER_COLLECTION_NAME: process.env.USER_COLLECTION_NAME || '',
    COMMENT_COLLECTION_NAME: process.env.COMMENT_COLLECTION_NAME || '',
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY ||'login123'
}

export const HTTP_STATUSES = {
    OK_200: 200,
    CREATED_201: 201, 
    NO_CONTENT_204: 204,
    BAD_REQUEST_400: 400,
    NOT_FOUND_404: 404,
    UNAUTHORIZED_401: 401,
    FORBIDDEN_403: 403
}

export enum StatusCode {
    Success = '1',
    BadRequest = '2',
    LoginError = '3',
    EmailError = '4',
    Unauthtorized = '5',
    NoContent = '6',
    NotFound = '7',
    Forbidden = '8'
}

export const ADMIN_AUTH = 'admin:qwerty' 

export const buff = Buffer.from(ADMIN_AUTH, 'utf8')
export const codedAuth = buff.toString('base64')
