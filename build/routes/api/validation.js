var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Joi from "joi";
const createSchema = Joi.object({
    text: Joi.string().required(),
    category: Joi.string().required(),
    time: Joi.string().required(),
});
const updateSchema = Joi.object({
    text: Joi.string().optional(),
    category: Joi.string().optional(),
    archived: Joi.boolean().optional()
}).or('text', 'category', 'archived');
const idSchema = Joi.object({
    id: Joi.string().required()
});
export const validateCreate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const value = yield createSchema.validateAsync(req.body);
    }
    catch (err) {
        return res.status(400).json({ message: err.message.replace(/"/g, '') });
    }
    next();
});
export const validateUpdate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const value = yield updateSchema.validateAsync(req.body);
    }
    catch (err) {
        const [{ type }] = err.details;
        if (type === 'object.unknown') {
            return res.status(400).json({ message: err.message });
        }
        return res.status(400).json({ message: 'missing fields' });
    }
    next();
});
export const validateId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const value = yield idSchema.validateAsync(req.params);
    }
    catch (err) {
        return res.status(400).json({ message: err.message });
    }
    next();
});
