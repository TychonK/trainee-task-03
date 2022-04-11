import { NextFunction, Request, Response } from "express";
import Joi, { ObjectSchema } from "joi";

const createSchema: ObjectSchema = Joi.object({
    text: Joi.string().required(),
    category: Joi.string().required(),
    time: Joi.string().required(),
})

const updateSchema: ObjectSchema = Joi.object({
    text: Joi.string().optional(),
    category: Joi.string().optional(),
    archived: Joi.boolean().optional()
}).or('text', 'category', 'archived')

const idSchema: ObjectSchema = Joi.object({
    id: Joi.string().required()
})

export const validateCreate = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const value = await createSchema.validateAsync(req.body)
    } catch (err: any) {
        return res.status(400).json({message: err.message.replace(/"/g, '')})
    }
    next()
}

export const validateUpdate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const value = await updateSchema.validateAsync(req.body)
    } catch (err: any) {
        const [{ type }] = err.details
        if (type === 'object.unknown') {
            return res.status(400).json({ message: err.message })
        }
        return res.status(400).json({ message: 'missing fields' })
    }
    next()
}

export const validateId = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const value = await idSchema.validateAsync(req.params)
    } catch (err: any) {
        return res.status(400).json({message: err.message})
    }
    next()
}