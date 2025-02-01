const jwt = require('jsonwebtoken');
const Boom = require('@hapi/boom');
const MESSAGES = require('../utils/constants');

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return next(Boom.unauthorized(MESSAGES.ERROR.NO_TOKEN_PROVIDED));
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            return next(Boom.unauthorized(MESSAGES.ERROR.FAILED_AUTHENTICATION));
        }
        req.user = user;
        next();
    });
};

module.exports = verifyToken;
