const express = require('express');
const router = express.Router();
const loginController = require("./login.controller");
const loginValidation = require('./login.validation');
const validate = require('../utils/validate');

router.route("/").post(validate(loginValidation.loginSchema), loginController.login);

module.exports = router;