
const createResponse = (res, status, data = {}, message = '') => {
    return res.status(status).json({
        status: status < 400 ? 'success' : 'error',
        data,
        message,
    });
};

// Middleware для обробки помилок
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    createResponse(res, 500, {}, err.message);
};

module.exports = { createResponse, errorHandler };
