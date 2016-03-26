var passport = require('passport');


module.exports = function (app) {

    // GOOGLE AUTHENTICATION AND REDIRECTION
    app.route('/auth/google')
        .get(passport.authenticate('google', {
            session: false,
            scope: [
                'https://www.googleapis.com/auth/userinfo.profile',
                'https://www.googleapis.com/auth/userinfo.email'
            ]
        }));

    app.route('/auth/google/oauth2redirect')
        .get(passport.authenticate('google', {
            successRedirect: '/',
            failure: '/error/'
        }));


    // AUXILIARY ENDPOINTS

    // checking if logged-in
    app.route('/auth/checklogin')
        .get(function (req, res) {
            if (req.user) {
                res.send(req.user);
            }
            else res.send(false);
        });


    // logging-out
    app.route('/auth/logout')
        .get(function (req, res) {
            req.logout();
            res.redirect('/');
        });


    // protecting routes
    app.route('/notallowed')
        .get(function (req, res, next) {
            if (!req.user) {
                res.redirect('/');
            }
            next();
        });
};
