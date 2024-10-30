
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
    let token;

    // Перевірка на наявність токена в заголовках запиту
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Отримуємо токен із заголовка
            token = req.headers.authorization.split(' ')[1];

            // Розшифровуємо токен для отримання ID користувача
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Знаходимо користувача за його ID в базі даних, обмежуючись потрібними полями
            const user = await User.findByPk(decoded.id, {
                attributes: ['id', 'name', 'email', 'role', 'is_blocked']
            });

            // Якщо користувача не знайдено
            if (!user) {
                return res.status(401).json({ message: 'Неавторизовано, користувача не знайдено' });
            }

            // Перевірка статусу блокування
            if (user.is_blocked) {
                return res.status(403).json({ message: 'Користувача заблоковано' });
            }

            // Зберігаємо інформацію про користувача в запиті для подальшого використання
            req.user = user;
            next(); // Продовжуємо до наступного middleware або контролера
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: 'Неавторизовано, помилка токена' });
        }
    } else {
        res.status(401).json({ message: 'Неавторизовано, відсутній токен' });
    }
};

module.exports = { protect };