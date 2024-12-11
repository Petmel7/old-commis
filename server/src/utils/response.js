
const createResponse = (res, status, data = [], message = '', type = 'generic') => {

    const responseData = Array.isArray(data) ? data : (data ? [data] : []);

    return res.status(status).json({
        status: status < 400 ? 'success' : 'error',
        type,
        data: responseData,
        message,
    });
};

module.exports = { createResponse };
