const Joi = require('@hapi/joi');
const MESSAGES = require('../utils/constants');
const { getFullDate } = require('./event.services');

exports.eventSchema = {
    body: Joi.object({
        eventName: Joi.string().required(),
        date: Joi.date()
            .min(getFullDate())
            .required()
            .messages({
                'date.min': MESSAGES.DATE.MINIMUM,
                'any.date': MESSAGES.DATE.REQUIRED
            })
        ,
        location: Joi.string().required(),
        meetingLink: Joi.string().required(),
        time: Joi.string()
            .pattern(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/)
            .required()
            .messages({
                'string.pattern.base': MESSAGES.TIME.FORMAT,
            }),
        registrationLimit: Joi.number(),
        guest: Joi.array().items(Joi.string())
    }).options({ abortEarly: false })
}

exports.editEventSchema = {
    body: Joi.object({
        eventName: Joi.string(),
        date: Joi.date()
            .messages({
                'date.base': MESSAGES.DATE.FORMAT,
            }),
        location: Joi.string(),
        meetingLink: Joi.string(),
        time: Joi.string()
            .pattern(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/)
            .messages({
                'string.pattern.base': MESSAGES.TIME.FORMAT,
            }),
        registrationLimit: Joi.number(),
        guest: Joi.array().items(Joi.string())
    }).options({ abortEarly: false }),
    params: Joi.object({
        eventId: Joi.number()
    })
}

exports.eventIdSchema = {
    params: Joi.object({
        eventId: Joi.number().required()
    })
}

exports.eventParamsSchema = {
    query: Joi.object({
        page: Joi.number().integer().min(1).default(1).optional().messages({
            'number.base': MESSAGES.PAGE.INVALID,
            'number.min': MESSAGES.PAGE.INVALID
        }),
        limit: Joi.number().integer().min(1).default(10).optional().messages({
            'number.base': MESSAGES.LIMIT.INVALID,
            'number.min': MESSAGES.LIMIT.INVALID
        }),
        eventStatus: Joi.string().valid('cancelled', 'upcoming', 'past').required()
    }).options({ abortEarly: false })
}
