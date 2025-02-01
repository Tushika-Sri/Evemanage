const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/session_authentication');
const statusController = require('./status.controller');
const statusValidation = require('./status.validation');
const validate = require('../utils/validate');

router.post('/', authMiddleware, validate(statusValidation.createStatus), statusController.createStatus);
router.get('/', validate(statusValidation.getStatus), statusController.getStatus);



module.exports = router;
