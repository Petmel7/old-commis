
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User, RefreshToken, Product } = require('../models');
const transporter = require('../config/emailConfig');
const { generateAccessToken, generateRefreshToken, generateConfirmationCode } = require('../auth/auth');
const { updateUserLoginStatus } = require('../utils/userUtils');

// Реєстрація нового користувача
const registerUser = async (req, res, next) => {
    const { name, lastname, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
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

        res.status(201).json({ message: 'User registered successfully. Please check your email to confirm.', isRegistered: true });
    } catch (error) {
        next(error); // Передача помилки в централізований обробник
    }
};

// Підтвердження електронної пошти
const confirmEmail = async (req, res, next) => {
    const { token } = req.params;
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        await User.update({ emailconfirmed: true }, { where: { email: decoded.email } });
        res.redirect('http://localhost:3000/login');
    } catch (error) {
        next(error);
    }
};

// Додавання номера телефону
const addPhoneNumber = async (req, res, next) => {
    const { phone } = req.body;
    try {
        const user = await User.findByPk(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const confirmationCode = generateConfirmationCode();
        await user.update({ phone, confirmationcode: confirmationCode });

        await transporter.sendMail({
            to: user.email,
            subject: 'Confirm your phone number',
            html: `<div>Your phone confirmation code: ${confirmationCode}</div>`
        });

        res.status(200).json({ message: 'Phone number added and confirmation email sent' });
    } catch (error) {
        next(error);
    }
};

// Підтвердження номера телефону
const confirmPhoneNumber = async (req, res, next) => {
    const { confirmationcode } = req.body;
    try {
        const user = await User.findByPk(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.confirmationcode === confirmationcode) {
            await user.update({ phoneconfirmed: true, confirmationcode: null });
            res.json({ message: 'Phone number confirmed successfully.' });
        } else {
            res.status(400).json({ message: 'Invalid confirmation code.' });
        }
    } catch (error) {
        next(error);
    }
};

// Логін користувача
const loginUser = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        await updateUserLoginStatus(user);

        const accessToken = generateAccessToken(user.id);
        const refreshToken = generateRefreshToken(user.id);

        await RefreshToken.create({ user_id: user.id, token: refreshToken });

        res.status(200).json({
            accessToken,
            refreshToken,
            user: {
                email: user.email,
                phone: user.phone,
                last_login: user.last_login, // опціонально повертаємо дату останнього входу
            }
        });
    } catch (error) {
        next(error);
    }
};

// Логаут користувача
const logoutUser = async (req, res, next) => {
    const { token } = req.body;

    if (!token) {
        return res.status(400).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
        const result = await RefreshToken.destroy({ where: { token } });

        if (!result) {
            return res.status(400).json({ message: 'Token not found' });
        }

        res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        next(error);
    }
};

// Профіль користувача
const getUserProfile = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.user.id, {
            attributes: ['id', 'name', 'lastname', 'email', 'emailconfirmed', 'phone', 'phoneconfirmed', 'confirmationcode', 'googleid', 'role', 'is_blocked']
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const userProfile = {
            ...user.toJSON(),
            googleRegistered: !!user.googleid
        };

        res.json(userProfile);
    } catch (error) {
        next(error);
    }
};

// Оновлення токену доступу
const refreshToken = async (req, res, next) => {
    const { token } = req.body;

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
        const storedToken = await RefreshToken.findOne({ where: { token } });

        if (!storedToken) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        const newAccessToken = generateAccessToken(decoded.id);
        const newRefreshToken = generateRefreshToken(decoded.id);

        storedToken.token = newRefreshToken;
        await storedToken.save();

        await deleteOldRefreshTokens();

        res.json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
    } catch (error) {
        next(error);
    }
};

// Видалення старих Refresh Tokens
const deleteOldRefreshTokens = async () => {
    try {
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() - 7); // Видалення токенів, старших за 7 днів

        const result = await RefreshToken.destroy({ where: { createdAt: { [Op.lt]: expirationDate } } });
        console.log(`Old refresh tokens deleted: ${result} tokens removed`);
    } catch (error) {
        console.error('Error deleting old refresh tokens:', error);
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
    refreshToken,
    deleteOldRefreshTokens
};
