const signupService = require('./signup.services');
const MESSAGES = require('../utils/constants');
const Boom = require('@hapi/boom');
const {successResponse} = require('../utils/api.response');

const signupUser = async (req, res, next) => {
  try {
    const { email, contact_number, password } = req.body;

    const existingUser = await signupService.findUserByEmailOrContact(email, contact_number);

    const errorMessages = {
      [email.toLowerCase()]: MESSAGES.ERROR.EMAIL_ALREADY_EXITS,
      [contact_number]: MESSAGES.ERROR.CONTACT_NUMBER_ALREADY_EXISTS
    };
    
    if (existingUser) {
      const errorMessage = errorMessages[existingUser.email] || errorMessages[existingUser.contact_number];
      if (errorMessage) {
        throw Boom.conflict(errorMessage);
      }
    }

    const username = email.split("@")[0];
    const newUser = await signupService.createUser({ email, username, contact_number, password });
    const successMessage = await successResponse(true, 200, {message: MESSAGES.SUCCESS.USER_CREATED_SUCCESSEFULLY, user: newUser});
    
    return res.send(successMessage);
  } catch (error) {
    next(error);
  }
};

module.exports = { signupUser };