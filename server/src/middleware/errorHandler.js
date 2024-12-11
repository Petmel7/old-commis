const logger = require('../utils/logger');
const Sentry = require('../utils/sentry');
const { createResponse } = require('../utils/response');

const errorHandler = (err, res,) => {

    logger.error(err.stack);

    Sentry.captureException(err);

    if (err.name === 'ValidationError') {
        return createResponse(res, 400, {}, err.message, 'validation_error');
    }

    if (err.name === 'UnauthorizedError') {
        return createResponse(res, 401, {}, 'Unauthorized access', 'auth_error');
    }

    console.error('Error details:', err.stack || err.message || err);
    res.status(500).json({
        status: 'error',
        type: 'server_error',
        message: err.message || 'An unexpected error occurred',
        stack: err.stack || null
    });
};

module.exports = { errorHandler };