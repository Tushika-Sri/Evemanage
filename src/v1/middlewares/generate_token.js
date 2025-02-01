require("dotenv/config");

const jwt = require('jsonwebtoken');
const redis = require('../../services/database/redis');

const DEFAULT_EXPIRATION = '2592000'

const generateAccessToken = async (user) => {
    try {
        const accessToken = jwt.sign({ username: user.email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30 days' });

        await redis.setex(user.email, DEFAULT_EXPIRATION, JSON.stringify({ accessToken, user })).catch(err => { throw err });

        return accessToken;
    } catch (err) {
        throw err;
    }
};

module.exports = { generateAccessToken };
