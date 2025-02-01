require("dotenv/config")

const jwt = require('jsonwebtoken');
const boom = require('@hapi/boom');
const redis = require('../../services/database/redis');
const MESSAGES = require("../utils/constants");

const authenticate = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const session = await redis.get(decoded.username).catch(err => { throw err });

        if (!session || JSON.parse(session).accessToken !== token) {
            throw boom.unauthorized(message = MESSAGES.ERROR.SESSION_EXPIRED);
        }

        req.user_id = JSON.parse(session).user.user_id;
        next();
    } catch (error) {
        next(boom.unauthorized(MESSAGES.ERROR.INVALID_TOKEN));

    }
};

module.exports = authenticate;
