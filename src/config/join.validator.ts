import * as Joi from 'joi';

export const JoiValidationSchema = Joi.object({
    DB_PASSWORD: Joi.string().allow(''),
    DB_NAME: Joi.string(),
    DB_USER: Joi.string(),
    DB_PORT: Joi.number(),
    DB_HOST: Joi.string(),
    DATABASE_URL: Joi.string(),
    JWT_SECRET: Joi.string().required(),
    PORT: Joi.number(),
})