const winston = require('winston');

// Налаштування логера з Winston
const logger = winston.createLogger({
    level: 'error',
    format: winston.format.json(),
    transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }), // Логування помилок у файл
        new winston.transports.Console(), // Логування в консоль
    ],
});

module.exports = logger;
