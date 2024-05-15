import {body, validationResult} from 'express-validator'
import { Request, Response, NextFunction } from 'express'
import { HTTP_STATUSES } from '../settings'
import { db } from '../db/db'
import { postBlogsRepository } from '../blogs/postBlogsRepository'
import { ObjectId } from 'mongodb';

// title: string,
// shortDescription: string,
// content: string,
// blogId: string,
// blogName: string

const postTitleValidator = body('title')
.isString().withMessage('title should be string')
.isLength({ max: 30 }).withMessage('title is too long')
.notEmpty()
.custom(value => {
    return /[a-z]/i.test(value)
}).withMessage('name should contain letters')

const postDescriptionValidator = body('shortDescription')
.isString().withMessage('shortDescription should be string')
.isLength({ max: 100 }).withMessage('shortDescription is too long')
.notEmpty()
.custom(value => {
    return /[a-z]/i.test(value)
}).withMessage('shortDescription should contain letters')

const postContentValidator = body('content')
.isString().withMessage('content should be string')
.isLength({ max: 1000 }).withMessage('content is too long')
.notEmpty()
.custom(value => {
    return /[a-z]/i.test(value)
}).withMessage('content should contain letters')

const postBlogIdValidator = body('blogId')
.isString().withMessage('blogId should be string')
.notEmpty()
.custom(async (value) => {
    const blog = await postBlogsRepository.find(new ObjectId(value))
    return blog
}).withMessage('blogId is not created')

export const createInputValidators = [
    postTitleValidator,
    postDescriptionValidator,
    postContentValidator,
    postBlogIdValidator
]

