const bcrypt = require("bcrypt");
const salt = 11;

const hashPassword = async password => await bcrypt.hash(password, salt).catch(err => { throw err });

const matchPassword = async (password, hash) => await bcrypt.compare(password, hash);

module.exports = {
    hashPassword, matchPassword
}

