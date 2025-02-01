const Joi = require('joi');
const { joiPasswordExtendCore } = require('joi-password');
const JoiPassword = Joi.extend(joiPasswordExtendCore);
const MESSAGES = require('../utils/constants');

const signup = {
  body: Joi.object({
    email: Joi.string()
      .email()
      .required()
      .messages({
        'string.base': MESSAGES.VALIDATION.EMAIL.BASE,
        'string.empty': MESSAGES.VALIDATION.EMAIL.EMPTY,
        'string.email': MESSAGES.VALIDATION.EMAIL.VALID,
        'any.required': MESSAGES.VALIDATION.EMAIL.REQUIRED
      }),
    contact_number: Joi.string()
      .pattern(/^[0-9]{10}$/)
      .required()
      .messages({
        'string.base': MESSAGES.VALIDATION.CONTACT_NUMBER.BASE,
        'string.empty': MESSAGES.VALIDATION.CONTACT_NUMBER.EMPTY,
        'string.pattern.base': MESSAGES.VALIDATION.CONTACT_NUMBER.PATTERN,
        'any.required': MESSAGES.VALIDATION.CONTACT_NUMBER.REQUIRED
      }),

      password: JoiPassword.string()
      .min(8)
      .minOfLowercase(1)
      .minOfUppercase(1)
      .minOfNumeric(1)
      .minOfSpecialCharacters(1)
      .required()
      .messages({
        'string.base': MESSAGES.VALIDATION.PASSWORD.BASE,
        'string.empty': MESSAGES.VALIDATION.PASSWORD.EMPTY,
        'string.min': MESSAGES.VALIDATION.PASSWORD.MIN,
        'password.minOfLowercase': MESSAGES.VALIDATION.PASSWORD.MIN_LOWERCASE,
        'password.minOfUppercase': MESSAGES.VALIDATION.PASSWORD.MIN_UPPERCASE,
        'password.minOfNumeric': MESSAGES.VALIDATION.PASSWORD.MIN_NUMERIC,
        'password.minOfSpecialCharacters': MESSAGES.VALIDATION.PASSWORD.MIN_SPECIAL,
        'any.required': MESSAGES.VALIDATION.PASSWORD.REQUIRED
      }),

      confirm_password: Joi.any()
      .valid(Joi.ref('password')).required()
      .messages({
        'any.only': MESSAGES.VALIDATION.PASSWORD.CONFIRM_MATCH,
        'any.required': MESSAGES.VALIDATION.PASSWORD.CONFIRM_REQUIRED
      })
  }).options({ abortEarly: false })
};

module.exports = { signup };