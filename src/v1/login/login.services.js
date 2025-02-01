const Boom = require('@hapi/boom');
const { matchPassword } = require('../middlewares/bcrypt');
const db = require("../../services/database/mysql");
const MESSAGES = require('../utils/constants');

exports.getUserByUsername = (username) => {
    let sql = `SELECT * FROM event_management_users WHERE email = '${username}'`;

    return db.execute(sql);
}

exports.findUser = async ({ username, password }) => {
        try {
            const [user, _] = await this.getUserByUsername(username);

            if (user.length === 0) throw Boom.notFound(MESSAGES.ERROR.USER_NOT_REGISTERED);

            if (user.length === 1) {
                const is_valid_password = await matchPassword(password, user[0].password);

                delete user[0].password;
                delete user[0].created_at;
                delete user[0].contact_number;

                if (is_valid_password) return [true, user[0]];
                else return [false, {}];
            }
        } catch (err) {
            throw err;
        }
}