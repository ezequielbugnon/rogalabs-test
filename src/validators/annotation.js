import { createRequire } from "module";
const require = createRequire(import.meta.url);
const  Joi = require('joi').extend(require('@joi/date'));

export const anotationSchema = Joi.object({
    idPessoa: Joi.number().required(),
    titulo: Joi.string().max(255).required(),
    descricao: Joi.string().max(2000),
})

export const anotationUpdateSchema = Joi.object({
    titulo: Joi.string().max(255),
    descricao: Joi.string().max(2000),
})