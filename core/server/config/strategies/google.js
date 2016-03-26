var config = require('../config');
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

module.exports = function () {

    passport.use(new GoogleStrategy(
        {
            clientID: config.google.clientID,
            clientSecret: config.google.clientSecret,
            callbackURL: config.google.callbackURL
        },

        function (accessToken, refreshToken, profile, done) {

            console.log('Google user loggint in...');
            user = {};
            user.email = profile.emails[0].value;
            user.image = profile._json.image.url;
            user.displayName = profile.displayName;

            user.google = {};
            user.google.id = profile.id;
            user.google.token = accessToken;

            console.log(user);

            done(null, user);
        }));
};