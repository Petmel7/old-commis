
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');
const { getServerUrl } = require('../utils/env');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${getServerUrl()}/api/users/google/callback`
}, async (accessToken, refreshToken, profile, done) => {
    try {
        // Перевіряємо за email
        let user = await User.findOne({ where: { email: profile.emails[0].value } });

        if (user) {

            if (user.auth_provider === 'local') {
                // Розрив Google логіну: акаунт є, але зареєстрований через local
                return done(null, false, {
                    message: 'google-local-conflict'
                });
            }

            // 🔁 Якщо Google — усе добре
            return done(null, user);
        }

        // ✅ Якщо користувача немає — створюємо Google-користувача
        user = await User.create({
            google_id: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
            email_confirmed: true,
            auth_provider: 'google'
        });

        done(null, user);
    } catch (error) {
        console.error('Google login error:', error);
        done(error, false);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findByPk(id);
        done(null, user);
    } catch (error) {
        done(error, false);
    }
});

module.exports = passport;

