const redis = require('../../services/database/redis');
const Boom = require('@hapi/boom');
const MESSAGES = require('../utils/constants');
const { successResponse } = require('../utils/api.response');
const { deleteSession } = require('./logout.service');

exports.logout = async (req, res, next) => {
    try {
        const token = req.headers['authorization']?.split(' ')[1];
        const email = req.user.username;
        const sessionExists = await redis.get(email);
        if (!sessionExists) {
            throw Boom.unauthorized(MESSAGES.ERROR.SESSION_NOT_FOUND);
        }
        await deleteSession(email);
        const logoutSuccessMessage = await successResponse(true, 200, { message: MESSAGES.SUCCESS.LOGOUT_SUCCESSFUL })
        return res.status(200).send(logoutSuccessMessage);
    } catch (err) {
        next(err);
    }
};
