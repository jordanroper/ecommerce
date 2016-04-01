module.exports = function (app) {

    require("./styles.css");
    require('./home.controller')(app);
};