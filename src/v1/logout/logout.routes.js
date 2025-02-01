const express = require('express');
const { logout } = require('../logout/logout.controller');
const verifyToken = require('../middlewares/verifyTokens');

const router = express.Router();

router.post('/', verifyToken, logout);

module.exports = router;