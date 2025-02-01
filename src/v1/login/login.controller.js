const loginService = require('../login/login.services');
const { generateAccessToken } = require('../middlewares/generate_token');
const Boom = require('@hapi/boom');
const MESSAGES = require('../utils/constants');
const { successResponse } = require('../utils/api.response');

exports.login = async (req, res, next) => {
    try {
        const [is_user_exists, user] = await loginService.findUser(req.body);

        if (is_user_exists) {
            const accessToken = await generateAccessToken(user, req);
            const loginSuccessMessage = await successResponse(true, 200, { message: MESSAGES.SUCCESS.LOGIN_SUCCESSFUL, accessToken })
            return res.status(200).send(loginSuccessMessage);
        } else {
            throw Boom.unauthorized(MESSAGES.ERROR.INVALID_PASSWORD);
        }
    } catch (err) {
        next(err)
    }
};