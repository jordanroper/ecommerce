var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var session = require('express-session');
var passport = require('passport');


var config = require('./config');


module.exports = function() {

    var app = express();
    
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cors());

    app.use(session({
        saveUninitialized: true,
        resave: true,
        secret: config.sessionSecret
    }));


    require('./passport.js')(app);
    require('../features/auth/auth.routes')(app);

    app.use(express.static('./core/public'));

    return app;
}
