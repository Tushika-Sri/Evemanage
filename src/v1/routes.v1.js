const express = require('express');
const statusRoutes = require('./status/status.routes');
const signupRoutes = require('./signup/signup.routes');
const loginRoutes = require('./login/login.routes');
const eventRoutes = require('./event/event.routes')
const logoutRoutes = require('./logout/logout.routes');
const router = express.Router();

router.use('/status', statusRoutes);
router.use('/signup', signupRoutes);
router.use('/login', loginRoutes);
router.use('/event', eventRoutes);
router.use('/logout',logoutRoutes);

module.exports = router;