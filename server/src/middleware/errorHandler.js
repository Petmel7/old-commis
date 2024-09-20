const logger = require('../utils/logger');
const Sentry = require('../utils/sentry');
const { createResponse } = require('../utils/response');

// Middleware для обробки помилок
const errorHandler = (err, req, res, next) => {
    // Логування помилки через Winston
    logger.error(err.stack);

    // Відправка помилки до Sentry
    Sentry.captureException(err);

    // Обробка помилки з поверненням користувачу
    if (err.name === 'ValidationError') {
        return createResponse(res, 400, {}, err.message, 'validation_error');
    }

    if (err.name === 'UnauthorizedError') {
        return createResponse(res, 401, {}, 'Unauthorized access', 'auth_error');
    }

    createResponse(res, 500, {}, 'An unexpected error occurred', 'server_error');
};

module.exports = { errorHandler };
