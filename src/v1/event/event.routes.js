const express = require("express");
const authenticate = require("../middlewares/session_authentication");
const eventController = require("./event.controller");
const validate = require("../utils/validate");
const eventValidation = require("./event.validation");

const router = express.Router()

router.route("/")
    .get(authenticate, validate(eventValidation.eventParamsSchema), eventController.getEvents)
    .post(authenticate, validate(eventValidation.eventSchema), eventController.addEvent);

router.route("/:eventId")
    .post(authenticate, validate(eventValidation.editEventSchema), eventController.editEvent);

router.route("/delete/:eventId")
    .patch(authenticate, validate(eventValidation.eventIdSchema), eventController.deleteEvent);

module.exports = router;