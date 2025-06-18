const passport = require('passport');
const UserService = require('../services/UserService');
const { getClientUrl } = require('../utils/env');

const registerUser = async (req, res, next) => {
    const { name, lastname, email, password } = req.body;
    try {
        await UserService.registerUser({ name, lastname, email, password });
        res.status(201).json({ message: 'User registered successfully. Please check your email to confirm.', isRegistered: true });
    } catch (error) {
        next(error);
    }
};

const confirmEmail = async (req, res, next) => {
    const { token } = req.params;

    if (!token) {
        return res.status(400).json({ error: 'Token is required' });
    }

    try {
        await UserService.confirmEmail(token);

        res.redirect(`${getClientUrl()}/login`);
    } catch (error) {
        next(error);
    }
};

const addPhoneNumber = async (req, res, next) => {
    const { phone } = req.body;
    try {
        await UserService.addPhoneNumber(phone, req.user.id);
        res.status(200).json({ message: 'Phone number added and confirmation email sent' });
    } catch (error) {
        next(error);
    }
};

const confirmPhoneNumber = async (req, res, next) => {
    const { confirmation_code } = req.body;

    try {
        const result = await UserService.confirmPhoneNumber(req.user.id, confirmation_code);

        res.json({ message: result.message });
    } catch (error) {
        if (error.status) {
            return res.status(error.status).json({ message: error.message });
        }
        next(error);
    }
};

const addLastName = async (req, res, next) => {
    const { lastName } = req.body;

    try {
        await UserService.addLastName(lastName, req.user.id);
        res.status(200).json({ message: 'last Name added' });
    } catch (error) {
        next(error);
    }
}

const loginUser = async (req, res, next) => {
    const { email, password } = req.body;

    try {

        const { accessToken, refreshToken, user } = await UserService.loginUser(email, password);

        res.status(200).json({
            accessToken,
            refreshToken,
            user: {
                email: user.email,
                phone: user.phone,
                last_login: user.last_login,
            },
        });
    } catch (error) {
        if (error.status) {
            return res.status(error.status).json({ message: error.message });
        }
        next(error);
    }
};

const googleCallback = (req, res, next) => {
    passport.authenticate('google', { session: false }, (err, user, info) => {
        if (err || !user) {
            const errorCode = info?.message || 'unknown-error';
            return res.redirect(`${getClientUrl()}/login?error=${errorCode}`);
        }

        req.login(user, async (err) => {
            if (err) return res.redirect(`${getClientUrl()}/login?error=login-failed`);

            const { redirectUrl } = await UserService.handleGoogleLogin(user);
            return res.redirect(redirectUrl);
        });
    })(req, res, next);
};

const logoutUser = async (req, res, next) => {
    const { token } = req.body;

    try {
        await UserService.logoutUser(token);
        res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        next(error);
    }
};

const getUserProfile = async (req, res, next) => {
    try {
        const userProfile = await UserService.getUserProfile(req.user.id);
        res.json(userProfile);
    } catch (error) {
        next(error);
    }
};

const refreshToken = async (req, res, next) => {
    const { token } = req.body;
    try {
        const { newAccessToken, newRefreshToken } = await UserService.refreshToken(token);

        res.json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    registerUser,
    confirmEmail,
    addPhoneNumber,
    addLastName,
    confirmPhoneNumber,
    loginUser,
    googleCallback,
    logoutUser,
    getUserProfile,
    refreshToken,
};
