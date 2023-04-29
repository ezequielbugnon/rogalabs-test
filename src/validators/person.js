import { createRequire } from "module";
const require = createRequire(import.meta.url);
const  Joi = require('joi').extend(require('@joi/date'));

export const personSchema = Joi.object({
    name: Joi.string().max(255).required(),
    momName: Joi.string().max(255).required(),
    dadName: Joi.string().max(255),
    cep: Joi.string().length(8).pattern(/^[0-9]+$/).required(),
    dateOfBirth: Joi.date().format(["YYYY-MM-DD"]).required()
})

export const personUpdateSchema = Joi.object({
    name: Joi.string().max(255),
    momName: Joi.string().max(255),
    dadName: Joi.string().max(255),
    cep: Joi.string().length(8).pattern(/^[0-9]+$/),
    dateOfBirth: Joi.date().format(["YYYY-MM-DD"])
})