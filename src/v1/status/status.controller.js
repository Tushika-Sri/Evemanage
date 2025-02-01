const statusService = require('./status.services');
const Boom = require('@hapi/boom');

const createStatus = async (req, res, next) => {
  try {
    const { name, description } = req.body;
    const { pk_client_id } = req.client;    
    const statusInfo = await statusService.createStatus( pk_client_id, name, description);
    res.status(201).json(statusInfo);    
  } catch (error) {    
    next(error);
  }
};

const getStatus = async (req, res, next) => {
  try {        
    const statusInfo = await statusService.getStatus(req.query.name);
    res.status(200).json(statusInfo);
  } catch (error) {
    next(Boom.badImplementation(error));
  }
};

module.exports = {
  createStatus,
  getStatus,
};
