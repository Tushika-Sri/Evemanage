const Joi = require('@hapi/joi');

exports.loginSchema = {
    body: Joi.object({
        username: Joi.string().email().lowercase().required(),
        password: Joi.string().required()
    }).options({ abortEarly: false })
}

