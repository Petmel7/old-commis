const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const transporter = require('../config/emailConfig');
const { User, RefreshToken, Product } = require('../models');
const { generateAccessToken, generateRefreshToken, generateConfirmationCode } = require('../auth/auth');
const { updateUserLoginStatus } = require('../utils/userUtils');
const { getServerUrl } = require('../utils/env');

const registerUser = async ({ name, lastname, email, password }) => {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
        throw { status: 400, message: 'User already exists' };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({ name, lastname, email, password: hashedPassword });

    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    const url = `${getServerUrl()}/api/users/confirm/${token}`;

    console.log('✅url', url);

    await transporter.sendMail({
        to: email,
        subject: 'Confirm your email',
        html: `<a href="${url}">Click here to confirm your email address.</a>`
    });
}

const confirmEmail = async (token) => {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    await User.update({ email_confirmed: true }, { where: { email: decoded.email } });
}

const addPhoneNumber = async (phone, userId) => {
    const user = await User.findByPk(userId);
    if (!user) {
        throw { status: 404, message: 'User not found' };

    }

    const confirmationCode = generateConfirmationCode();
    await user.update({ phone, confirmation_code: confirmationCode });

    await transporter.sendMail({
        to: user.email,
        subject: 'Confirm your phone number',
        html: `<div>Your phone confirmation code: ${confirmationCode}</div>`
    });
}

const confirmPhoneNumber = async (userId, confirmationcode) => {

    const user = await User.findByPk(userId);
    if (!user) {
        throw { status: 404, message: 'No user found' };
    }

    if (user.confirmation_code !== confirmationcode) {
        throw { status: 400, message: 'Invalid verification code.' };
    }

    await user.update({ phone_confirmed: true, confirmation_code: null });

    return { message: 'The phone number has been successfully verified.' };
};

const loginUser = async (email, password) => {

    const user = await User.findOne({ where: { email } });
    if (!user) {
        throw { status: 400, message: 'Invalid credentials' };
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
        throw { status: 400, message: 'Invalid credentials' };
    }

    await updateUserLoginStatus(user);

    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

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
            'last_name',
            'email',
            'email_confirmed',
            'phone',
            'phone_confirmed',
            'confirmation_code',
            'google_id',
            'role',
            'is_blocked'
        ]
    });

    if (!user) {
        throw { status: 404, message: 'User not found' };
    }

    return {
        ...user.toJSON(),
        googleRegistered: !!user.google_id
    };
};

const refreshToken = async (token) => {
    if (!token) {
        throw { status: 401, message: 'Invalid token' };
    }

    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    const storedToken = await RefreshToken.findOne({ where: { token } });

    if (!storedToken) {
        throw { status: 401, message: 'Invalid token' };
    }

    const newAccessToken = generateAccessToken(decoded.id);
    const newRefreshToken = generateRefreshToken(decoded.id);

    storedToken.token = newRefreshToken;
    await storedToken.save();

    await deleteOldRefreshTokens();

    return { newAccessToken, newRefreshToken };
}

const deleteOldRefreshTokens = async () => {
    try {
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() - 7);

        const result = await RefreshToken.destroy({ where: { createdAt: { [Op.lt]: expirationDate } } });
        console.log(`Old refresh tokens deleted: ${result} tokens removed`);
    } catch (error) {
        console.error('Error deleting old refresh tokens:', error);
    }
};

const updateUserRoleIfNecessary = async (user) => {

    if (user.role === 'superadmin') return;

    const [updatedRows] = await User.update({ role: 'seller' }, { where: { id: user.id } });

    if (updatedRows === 0) {
        throw new Error('User not found or role not updated');
    }
};

const updateUserRoleIfNoProducts = async (userId) => {

    const user = await User.findByPk(userId, { attributes: ['role'] });

    if (!user) {
        throw new Error('No user found');
    }

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
    refreshToken,
    updateUserRoleIfNecessary,
    updateUserRoleIfNoProducts
};
