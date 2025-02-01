const bcrypt = require('bcrypt');
const pool = require('../../services/database/mysql');
const Boom = require('@hapi/boom');
const MESSAGES = require('../utils/constants');

const SALT_ROUNDS = 10;

const findUserByEmailOrContact = async (email, contact_number) => {
    try {
        const lowercasedEmail = email.toLowerCase();
        const [rows] = await pool.query('SELECT * FROM event_management_users WHERE email = ? OR contact_number = ?',[lowercasedEmail, contact_number]);
        return rows[0];
    } catch (error) {
        throw Boom.badImplementation(error.message);
    }
};

const createUser = async ({ email, username, contact_number, password}) => {
    try {
        const lowercasedEmail = email.toLowerCase();
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

        const query = 'INSERT INTO event_management_users (email, username, contact_number, password) VALUES (?, ?, ?, ?)';
        const [result] = await pool.query(query, [lowercasedEmail, username, contact_number, hashedPassword]);
        
        if (result.affectedRows === 0) {
            throw Boom.badRequest(MESSAGES.ERROR.REGISTRATION_FAILED);
        }
        return { id: result.insertId, email: lowercasedEmail, username, contact_number };
    } catch (error) {
        throw Boom.badImplementation(error.message);
    }
};

module.exports = { findUserByEmailOrContact, createUser };