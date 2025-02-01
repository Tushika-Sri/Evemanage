const Joi = require('@hapi/joi');

const createStatus = {
  body: Joi.object({
    name: Joi.string().required(),
    description: Joi.string().allow(null, '')    
  }),
};

const getStatus = {
  query: Joi.object({
    name: Joi.string().required(),
  }),
};


module.exports = {
  createStatus,
  getStatus
};
