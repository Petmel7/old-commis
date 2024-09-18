const createResponse = (res, status, data = {}, message = '', type = 'generic') => {
    return res.status(status).json({
        status: status < 400 ? 'success' : 'error',
        type,  // Додаємо тип для ідентифікації типу помилки (валідаційна, авторизаційна тощо)
        data,
        message,
    });
};

module.exports = { createResponse };
