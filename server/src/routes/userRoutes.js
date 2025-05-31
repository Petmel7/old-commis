
const express = require('express');
const passport = require('../config/passport');
const { registerUser, confirmEmail, addPhoneNumber, confirmPhoneNumber, loginUser, getUserProfile, refreshToken, logoutUser } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const { generateAccessToken, generateRefreshToken } = require('../auth/auth');
const { RefreshToken } = require('../models');
const { updateUserLoginStatus } = require('../utils/userUtils');
const { getClientUrl } = require('../utils/env');
const router = express.Router();

router.get('/profile', protect, getUserProfile);
router.get('/confirm/:token', confirmEmail);
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.post('/refresh-token', refreshToken);
router.post('/add-phone', protect, addPhoneNumber);
router.post('/confirm-phone', protect, confirmPhoneNumber);

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', passport.authenticate('google', {
    failureRedirect: '/login?error=google-local-conflict',
    session: false
}),
    async (req, res) => {
        req.login(req.user, async (err) => {
            if (err) {
                return res.status(500).json({ message: 'Login error' });
            }
            try {
                const user = req.user;
                await updateUserLoginStatus(user);

                const accessToken = generateAccessToken(req.user.id);
                const refreshToken = generateRefreshToken(req.user.id);

                await RefreshToken.create({ user_id: req.user.id, token: refreshToken });

                res.redirect(`${getClientUrl()}/auth/callback?token=${accessToken}&refreshToken=${refreshToken}`);
            } catch (error) {
                console.error('Error during Google authentication:', error);
                res.status(500).json({ message: 'Failed to authenticate with Google' });
            }
        });
    });

module.exports = router;







