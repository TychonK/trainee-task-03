import Joi from "joi";

const createSchema = Joi.object({
    text: Joi.string().required(),
    category: Joi.string().required(),
    time: Joi.string().required()
})

const updateSchema = Joi.object({
    text: Joi.string().optional(),
    category: Joi.string().email().optional(),
    archived: Joi.boolean().optional()
}).or('text', 'category', 'archived')

const idSchema = Joi.object({
    id: Joi.string().required()
})

export const validateCreate = async (req: any, res: any, next: any) => {
    try {
        const value = await createSchema.validateAsync(req.body)
    } catch (err: any) {
        return res.status(400).json({message: err.message.replace(/"/g, '')})
    }
    next()
}

export const validateUpdate = async (req: any, res: any, next: any) => {
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

export const validateId = async (req: any, res: any, next: any) => {
    try {
        const value = await idSchema.validateAsync(req.params)
    } catch (err: any) {
        return res.status(400).json({message: err.message})
    }
    next()
}