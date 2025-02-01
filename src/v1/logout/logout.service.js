const redis = require('../../services/database/redis');
const Boom = require('@hapi/boom');
const MESSAGES = require('../utils/constants');

const deleteSession = async (email) => {
  try {
    await redis.del(email);
  } catch (err) {
    throw Boom.badImplementation(MESSAGES.ERROR.SESSION_DELETION_FAILED);
  }
};

module.exports = {
  deleteSession,
};