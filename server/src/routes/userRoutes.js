
const express = require('express');
const passport = require('../config/passport');
const { registerUser, confirmEmail, addPhoneNumber, confirmPhoneNumber, loginUser, googleCallback, getUserProfile, refreshToken, logoutUser, addLastName } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', googleCallback);

router.get('/profile', protect, getUserProfile);
router.get('/confirm/:token', confirmEmail);
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.post('/refresh-token', refreshToken);
router.post('/add-phone', protect, addPhoneNumber);
router.post('/confirm-phone', protect, confirmPhoneNumber);
router.post('/add-last-name', protect, addLastName);

module.exports = router;