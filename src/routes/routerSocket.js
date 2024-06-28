let users = require('./socketUsers');
let admin = require('./socketAdmin');
let agency = require('./socketAgency');

// Router Websocket
module.exports = function (app, redT) {
    app.ws('/connect', (ws, req) => {
        users(ws, redT);
    });
    app.ws('/cms102', (ws, req) => {
        admin(ws, redT)
    });
    app.ws('/agency', (ws, req) => {
        agency(ws, redT)
    });
};