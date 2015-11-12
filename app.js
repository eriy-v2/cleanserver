/**
 * Created by eriy on 10.11.15.
 */

function app() {
    "use strict";
    var http    = require('http');
    var https   = require('https');
    var fs      = require('fs');
    var path    = require('path');
    var express = require('express');
    var session = require('express-session');
    var morgan  = require('morgan');
    var cookie  = require('cookie');
    var signature = require('cookie-signature');
    var app     = express();

    var httpsOptions;
    var httpServer;
    var httpsServer;
    var httpSession;
    var servers = {};

    httpSession = session({
        name             : 'server.sid',
        resave           : false, /* ATTENTION: this must be discuss for every project */
        rolling          : false,
        saveUninitialized: false, /* ATTENTION: this must be discuss for every project */
        secret           : 'super hyper secret string' /* ATTENTION: this must be unique for every project */
    });

    app.set('x-powered-by', false);

    app.use(function(req, res, next) {
        if (req.headers['x-session-token']) {
            console.log('HeaderSessTok:', req.headers['x-session-token']);
            req.headers.cookie = req.headers['x-session-token'];
        }
        console.log(req.headers.cookie);
        next();
    });
    app.use(httpSession);
    app.use(function (req, res, next) {
        console.log(req.sessionID);
        next();
    });

    if (process.env.NODE_ENV !== 'production') {
        app.use(morgan('common'));
    }
    require('./routes')(app);

    if (process.env.HTTPS === 'true') {
        httpsOptions = {
            key: fs.readFileSync( path.join(__dirname, 'config', process.env.HTTPS_KEY_FILE) ),
            cert: fs.readFileSync( path.join(__dirname, 'config', process.env.HTTPS_CERT_FILE) )
        };

        httpsServer = https.createServer(httpsOptions, app);
        httpsServer.listen(process.env.HTTPS_PORT, function () {
            console.log( `HTTPS Server started: ${process.env.HTTPS_HOST}` );
        });
    }

    if (process.env.HTTP === 'true') {
        httpServer = http.createServer(app);
        httpServer.listen(process.env.PORT, function () {
            console.log( `HTTP Server started: ${process.env.HOST}` );
        });
    }
}

module.exports = app;