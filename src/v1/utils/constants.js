const MESSAGES = {
    VALIDATION: {
        EMAIL: {
            BASE: 'Email must be a string',
            EMPTY: 'Email cannot be empty',
            VALID: 'Email must be valid',
            REQUIRED: 'Email is required'
        },
        CONTACT_NUMBER: {
            BASE: 'Contact Number must be a type of text',
            EMPTY: 'Contact Number cannot be empty',
            PATTERN: 'Contact Number must be exactly 10 digits',
            REQUIRED: 'Contact Number is required'
        },
        PASSWORD: {
            BASE: 'Password must be a string',
            EMPTY: 'Password cannot be empty',
            MIN: 'Password must be at least 8 characters long',
            MIN_LOWERCASE: 'Password must contain at least one lowercase letter',
            MIN_UPPERCASE: 'Password must contain at least one uppercase letter',
            MIN_NUMERIC: 'Password must contain at least one number',
            MIN_SPECIAL: 'Password must contain at least one special character',
            REQUIRED: 'Password is required',
            CONFIRM_MATCH: 'Confirm password must match the password',
            CONFIRM_REQUIRED: 'Confirm password is required'
        },
        EVENT: {
            DUPLICATE_EVENT_NAME: "Event name already exists"
        }
    },
    DATE: {
        FORMAT: 'Date should be of format YYYY-MM-DD',
        REQUIRED: 'Date is required',
        MINIMUM: 'Can\'t create past events'
    },
    TIME: {
        FORMAT: 'Time must be in the format HH:MM:SS'
    },
    PAGE: {
        INVALID: 'Invalid page number (starts with 1)'
    },
    LIMIT: {
        INVALID: 'Invalid limit value'
    },
    IS_ACTIVE: {
        ACCEPT_ONLY_O_1: 'Value must be either 0 or 1'
    },
    ERROR: {
        EMAIL_ALREADY_EXITS: 'Email already exists',
        CONTACT_NUMBER_ALREADY_EXISTS: 'Contact Number already exists',
        REGISTRATION_FAILED: 'Registration failed, please try again',
        USER_NOT_REGISTERED: 'User is not registered',
        SERVER_ISSUE: 'Internal Server Error',
        INVALID_PASSWORD: 'Invalid Password',
        NO_EVENTS_FOUND: 'No events found',
        NO_EVENT_FOUND: 'No event found with the given event id',
        EVENT_NOT_UPDATED: 'Event not updated (please provide new details)',
        PAGE_NOT_FOUND: 'Page doesn\'t exist',
        INVALID_PAGE_NUMBER: 'Invalid page number (starts with 1)',
        INVALID_LIMIT_VALUE: 'Invalid limit value',
        SESSION_EXPIRED: 'Session expired or not found',
        INVALID_TOKEN: 'Invalid token',
        INVALID_EVENT_STATUS: 'Invalid Event Status',
        EVENT_ALREADY_EXIST: 'Event name already exists',
        PROVIDE_NEW_UPDATES: 'Update unsuccessful: No new data was provided for the update.',
        UNABLE_TO_UPDATE_EVENT: 'Unable to update the event',
        UNABLE_TO_ADD_EVENT: 'Unable to add the event',
        UNABLE_TO_CANCEL_EVENT: 'Unable to cancel the event',
        EVENT_ALREADY_CANCELLED: 'Event is already cancelled',
        NO_TOKEN_PROVIDED: 'No token provided',
        FAILED_AUTHENTICATION: 'Failed to authenticate token',
        SESSION_NOT_FOUND: 'Session not found. Please log in again.',
        SESSION_DELETION_FAILED: 'Failed to delete session. Please try again later.'
    },
    SUCCESS: {
        USER_CREATED_SUCCESSEFULLY: 'User created successfully',
        LOGIN_SUCCESSFUL: 'Login Successful',
        EVENT_ADDED_SUCCESSFULLY: 'Event added successfully',
        EVENT_UPDATED_SUCCESSFULLY: 'Event updated successfully',
        EVENT_CANCELLED_SUCCESSFULLY: 'Event cancelled successfully',
        LOGOUT_SUCCESSFUL: 'Logout Successful'
    }
};

module.exports = MESSAGES;