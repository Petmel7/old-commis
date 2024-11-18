const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const transporter = require('../config/emailConfig');
const { User, RefreshToken, Product } = require('../models');
const { generateAccessToken, generateRefreshToken, generateConfirmationCode } = require('../auth/auth');
const { updateUserLoginStatus } = require('../utils/userUtils');

const registerUser = async ({ name, lastname, email, password }) => {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
        throw { status: 400, message: 'User already exists' };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({ name, lastname, email, password: hashedPassword });

    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    const url = `http://localhost:5000/api/users/confirm/${token}`;

    await transporter.sendMail({
        to: email,
        subject: 'Confirm your email',
        html: `<a href="${url}">Click here to confirm your email address.</a>`
    });
}

const confirmEmail = async (token) => {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    await User.update({ emailconfirmed: true }, { where: { email: decoded.email } });
}

const addPhoneNumber = async (phone, userId) => {
    const user = await User.findByPk(userId);
    if (!user) {
        throw { status: 404, message: 'User not found' };

    }

    const confirmationCode = generateConfirmationCode();
    await user.update({ phone, confirmationcode: confirmationCode });

    await transporter.sendMail({
        to: user.email,
        subject: 'Confirm your phone number',
        html: `<div>Your phone confirmation code: ${confirmationCode}</div>`
    });
}

const confirmPhoneNumber = async (userId, confirmationcode) => {
    // Знаходимо користувача за ID
    const user = await User.findByPk(userId);
    if (!user) {
        throw { status: 404, message: 'Користувача не знайдено' };
    }

    // Перевіряємо код підтвердження
    if (user.confirmationcode !== confirmationcode) {
        throw { status: 400, message: 'Невірний код підтвердження.' };
    }

    // Оновлюємо статус підтвердження телефону
    await user.update({ phoneconfirmed: true, confirmationcode: null });

    return { message: 'Номер телефону успішно підтверджено.' };
};

// Логіка авторизації
const loginUser = async (email, password) => {
    // Перевірка наявності користувача
    const user = await User.findOne({ where: { email } });
    if (!user) {
        throw { status: 400, message: 'Невірні облікові дані' };
    }

    // Перевірка пароля
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
        throw { status: 400, message: 'Невірні облікові дані' };
    }

    // Оновлюємо дату останнього входу
    await updateUserLoginStatus(user);

    // Генеруємо токени
    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    // Зберігаємо refresh token у базі даних
    await RefreshToken.create({ user_id: user.id, token: refreshToken });

    return { accessToken, refreshToken, user };
};

const logoutUser = async (token) => {
    if (!token) {
        throw { status: 400, message: 'No token provided' };
    }
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    const result = await RefreshToken.destroy({ where: { token } });

    if (!result) {
        throw { status: 400, message: 'Token not found' };
    }
}

const getUserProfile = async (userId) => {
    const user = await User.findByPk(userId, {
        attributes: [
            'id',
            'name',
            'lastname',
            'email',
            'emailconfirmed',
            'phone',
            'phoneconfirmed',
            'confirmationcode',
            'googleid',
            'role',
            'is_blocked'
        ]
    });

    if (!user) {
        throw { status: 404, message: 'User not found' };
    }

    // Додаємо додаткові поля до профілю
    return {
        ...user.toJSON(),
        googleRegistered: !!user.googleid // Boolean значення для реєстрації через Google
    };
};

const updateUserRoleIfNecessary = async (user) => {
    // Якщо користувач — superadmin, ніяких змін не потрібно
    if (user.role === 'superadmin') return;

    // Оновлюємо роль користувача на 'seller', якщо це необхідно
    const [updatedRows] = await User.update({ role: 'seller' }, { where: { id: user.id } });

    if (updatedRows === 0) {
        throw new Error('User not found or role not updated');
    }
};

const updateUserRoleIfNoProducts = async (userId) => {
    // Отримуємо користувача, щоб перевірити його роль
    const user = await User.findByPk(userId, { attributes: ['role'] });

    if (!user) {
        throw new Error('Користувача не знайдено');
    }

    // Ігноруємо зміну ролі для адміністраторів
    if (user.role === 'superadmin') {
        return;
    }
    const remainingUserProducts = await Product.count({ where: { user_id: userId } });
    if (remainingUserProducts === 0) {
        await User.update({ role: 'buyer' }, { where: { id: userId } });
    }
};

module.exports = {
    registerUser,
    confirmEmail,
    addPhoneNumber,
    confirmPhoneNumber,
    loginUser,
    logoutUser,
    getUserProfile,
    updateUserRoleIfNecessary,
    updateUserRoleIfNoProducts
};
