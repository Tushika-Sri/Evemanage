const Event = require('./event.services.js');
const Boom = require("@hapi/boom");
const MESSAGES = require("../utils/constants.js");
const { successResponse } = require("../utils/api.response.js");

const convertTo12HourFormat = (time24) => {
    const [hours24, minutes, seconds] = time24.split(':').map(Number);

    const suffix = hours24 >= 12 ? 'PM' : 'AM';

    const hours12 = hours24 % 12 || 12;

    const formattedHours = hours12.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');

    return `${formattedHours}:${formattedMinutes} ${suffix}`;
}

const formatDate = (eventDate) => {
    const date = new Date(eventDate);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);

    return formattedDate;
}

const arraysAreEqual = (arr1, arr2) => {
    return JSON.stringify(arr1) === JSON.stringify(arr2);
}

const compareObjects = (fullObj, subsetObj) => {
    for (let key in subsetObj) {

        if ((typeof subsetObj[key]) === 'object') {
            if (!arraysAreEqual(subsetObj[key], fullObj[key])) return true;
        }
        else if (fullObj[key] !== subsetObj[key]) {
            return true;
        }
    }
    return false;
}

exports.getEvents = async (req, res, next) => {
    try {
        let { page = 1, limit = 10, eventStatus } = req.query;

        let [events, totalNoOfEvents] = await Event.getEventList(page, limit, eventStatus, req.user_id).catch(err => {
            throw err;
        });

        totalNoOfEvents = totalNoOfEvents[0][0]['COUNT(*)'];

        if (totalNoOfEvents === 0) return res.status(200).json({ message: MESSAGES.ERROR.NO_EVENTS_FOUND, success: true });

        let noOfPages = Math.ceil(totalNoOfEvents / limit);

        if (page > noOfPages) throw Boom.notFound(MESSAGES.ERROR.PAGE_NOT_FOUND);

        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        const results = {}

        if (endIndex < totalNoOfEvents) {
            results.next = {
                page: page + 1,
                limit: limit
            }
        }

        if (startIndex > 0) {
            results.prev = {
                page: page - 1,
                limit: limit
            }
        }
        events[0].forEach(event => {
            delete event['user_id'];
            delete event['isActive'];
            event.time = convertTo12HourFormat(event.time);
            event.date = formatDate(event.date);
        })

        results.noOfEvents = events[0].length;
        results.noOfPages = noOfPages;
        results.totalNoOfEvents = totalNoOfEvents;
        results.events = events[0];

        const successMessage = await successResponse(true, 200, { eventList: results });

        return res.status(200).send(successMessage);
    } catch (err) {
        next(err);
    }
}

exports.addEvent = async (req, res, next) => {
    try {
        const [{ affectedRows }] = await Event.addEvent(req.body, req.user_id)

        if (!affectedRows) throw Boom.badRequest(MESSAGES.ERROR.UNABLE_TO_ADD_EVENT)

        const successMessage = await successResponse(true, 201, { message: MESSAGES.SUCCESS.EVENT_ADDED_SUCCESSFULLY });
        return res.status(201).send(successMessage);
    } catch (err) {
        if (err.errno === 1062) {
            next(Boom.conflict(MESSAGES.ERROR.EVENT_ALREADY_EXIST))
        }
        next(err);
    }
}

exports.editEvent = async (req, res, next) => {
    try {
        const [event, _] = await Event.getEventById(req.params.eventId, req.user_id);
        if (event.length === 0) {
            throw Boom.badRequest(MESSAGES.ERROR.NO_EVENT_FOUND);
        }

        if (!compareObjects(event[0], req.body)) {
            throw Boom.badRequest(MESSAGES.ERROR.PROVIDE_NEW_UPDATES);
        }

        let newEvent = { ...event[0], ...req.body };

        const [{ changedRows },] = await Event.updateEvent(newEvent, req.params.eventId, req.user_id);
        if (!changedRows) {
            throw Boom.badRequest(MESSAGES.ERROR.UNABLE_TO_UPDATE_EVENT);
        }

        const successMessage = await successResponse(true, 200, { message: MESSAGES.SUCCESS.EVENT_UPDATED_SUCCESSFULLY });
        return res.status(200).send(successMessage);
    } catch (err) {
        if (err.errno === 1062) {
            next(Boom.conflict(MESSAGES.ERROR.EVENT_ALREADY_EXIST))
        }
        next(err);
    }
}

exports.deleteEvent = async (req, res, next) => {
    try {
        const [event, _] = await Event.getEventById(req.params.eventId, req.user_id);
        if (event.length === 0) {
            throw Boom.badRequest(MESSAGES.ERROR.NO_EVENT_FOUND);
        }

        const [{ affectedRows, changedRows },] = await Event.deleteEvent(req.params.eventId, req.user_id);

        if (!affectedRows) {
            throw Boom.badRequest(MESSAGES.ERROR.UNABLE_TO_CANCEL_EVENT);
        }

        if (!changedRows) {
            throw Boom.badRequest(MESSAGES.ERROR.EVENT_ALREADY_CANCELLED)
        }

        const successMessage = await successResponse(true, 200, { message: MESSAGES.SUCCESS.EVENT_CANCELLED_SUCCESSFULLY });
        return res.status(200).send(successMessage);
    } catch (err) {
        next(err);
    }
}