const Boom = require("@hapi/boom");
const db = require("../../services/database/mysql");
const MESSAGES = require("../utils/constants");

exports.getFullDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
}

exports.getEventById = async (event_id, user_id) => {
    try {
        let sql = `SELECT *, DATE_FORMAT(date, '%Y-%m-%d') as date FROM events WHERE user_id=${user_id} AND event_id=${event_id}`;
        return await db.execute(sql);
    } catch (err) {
        throw err;
    }
}

const findTotalNoOfEvents = async (user_id, eventStatus) => {
    try {
        let sql_status;
        switch (eventStatus) {
            case "cancelled":
                sql_status = `isActive=0;`;
                break;
            case "upcoming":
                sql_status = `date >= "${this.getFullDate()}" AND  isActive = 1;`;
                break;
            case "past":
                sql_status = `date < "${this.getFullDate()} " AND  isActive = 1;`;
                break;
            default:
                throw Boom.badRequest(message = MESSAGES.ERROR.INVALID_EVENT_STATUS);
        }
        let sql = `SELECT COUNT(*) FROM events WHERE user_id=${user_id} AND ` + sql_status;
        return await db.execute(sql)
    } catch (err) {
        throw err;
    }
}

exports.getEventList = async (page, limit, eventStatus, user_id) => {
    try {
        let sql;
        const limitOffset = ` LIMIT ${limit} OFFSET ${(page - 1) * limit};`;

        switch (eventStatus) {
            case "cancelled":
                sql =
                    `SELECT * FROM events
                WHERE user_id=${user_id}
                AND isActive = 0
                ORDER BY date DESC, time DESC `+ limitOffset;
                break;
            case "upcoming":
                sql =
                    `SELECT * FROM events
                WHERE user_id=${user_id}
                AND date >='${this.getFullDate()}' AND  isActive = 1
                ORDER BY date ASC, time ASC `+ limitOffset;
                break;
            case "past":
                sql =
                    `SELECT * FROM events
                WHERE user_id=${user_id}
                AND date < '${this.getFullDate()}' AND  isActive = 1
                ORDER BY date DESC, time DESC `+ limitOffset;
                break;
            default:
                throw Boom.badRequest(MESSAGES.ERROR.INVALID_EVENT_STATUS);
        }

        return [await db.execute(sql), await findTotalNoOfEvents(user_id, eventStatus)];
    } catch (err) {
        throw err;
    }

}

exports.addEvent = async ({ eventName, date, location, meetingLink, time, registrationLimit, guest }, user_id) => {
    try {
        let sql = `
        INSERT INTO events(user_id, eventName, date, location, meetingLink, time, registrationLimit, guest)
        VALUES(${user_id}, '${eventName}', '${date}', '${location}', '${meetingLink}','${time}', ${registrationLimit}, '${JSON.stringify(guest)}');
        `;
        return await db.execute(sql);
    } catch (err) {
        throw err;
    }
}

exports.updateEvent = ({ eventName, date, location, meetingLink, time, registrationLimit, guest }, event_id, user_id) => {
    try {
        let sql = `
        UPDATE events SET eventName='${eventName}', date='${date}', location='${location}', meetingLink='${meetingLink}', time='${time}', registrationLimit='${registrationLimit}', guest='${JSON.stringify(guest)}' WHERE event_id=${event_id} AND user_id=${user_id};
        `;
        return db.execute(sql);
    } catch (err) {
        throw err;
    }
}

exports.deleteEvent = (event_id, user_id) => {
    try {
        let sql = `
        UPDATE events SET isActive=0 WHERE event_id=${event_id} AND user_id=${user_id};
        `;
        return db.execute(sql);
    } catch (err) {
        throw err;
    }
}
