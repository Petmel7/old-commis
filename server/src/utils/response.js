
const createResponse = (res, status, data = [], message = '', type = 'generic') => {
    // Перевіряємо, чи data є масивом або об'єктом, і обгортаємо в масив, якщо необхідно
    const responseData = Array.isArray(data) ? data : (data ? [data] : []);

    return res.status(status).json({
        status: status < 400 ? 'success' : 'error',
        type,  // Додаємо тип для ідентифікації типу помилки (валідаційна, авторизаційна тощо)
        data: responseData,  // Завжди повертаємо масив
        message,
    });
};

module.exports = { createResponse };
