
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');
// const { getGoogleCallbackUrl } = require('../utils/env');
const { getServerUrl } = require('../utils/env');

// console.log('✅✅getGoogleCallbackUrl', getGoogleCallbackUrl());

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    // callbackURL: getGoogleCallbackUrl()
    // callbackURL: '/api/users/google/callback'
    callbackURL: `${getServerUrl()}/api/users/google/callback`
},
    async (accessToken, refreshToken, profile, done) => {
        try {
            let user = await User.findOne({ where: { google_id: profile.id } });
            if (!user) {
                console.log('Creating new user with Google profile: ', profile);
                user = await User.create({
                    google_id: profile.id,
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    email_confirmed: true
                });
            }
            done(null, user);
        } catch (error) {
            console.error('Error during user creation: ', error);
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

