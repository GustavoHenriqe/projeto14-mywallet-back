import joi from "joi"

export const headerTokenSchema = joi.string().regex(/^Bearer\s/).required()

const accepted = ["entrada", "saida"]

export const paramTypeSchema = joi.string().valid(...accepted).required()

export const bodySchema = joi.object().keys({
    value: joi.number().min(0.01).required(),
    description: joi.string().required()
  })