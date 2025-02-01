const express = require('express');
const router = express.Router();
const validate = require('../utils/validate');
const signupController = require('./signup.controller');
const signupValidation = require('./signup.validation');

router.post('/',validate(signupValidation.signup),signupController.signupUser);

module.exports = router;