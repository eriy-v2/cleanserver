/**
 * Created by eriy on 11.11.15.
 */
var router = require('express').Router();
var cookie  = require('cookie');
var signature = require('cookie-signature');

function indexRoute(app) {
    "use strict";
    /*app.use(function (req, res, next) {
        var sessionID = req.query.sessionID;

        if (!sessionID) {
            return next();
        }

        req.sessionStore.load(sessionID, function(err, sess) {
            console.log(sess);
            next()
        });



        /!*req.sessionStore.get(sessionID, function (err, session) {
            if (err) {
                return next(err);
            }

            if (!session) {
                err        = new Error('unAuthorized');
                err.status = 403;

                return next();
            }
            console.log(session);
            req.sessionID = sessionID;
            req.sessionStore.
            next();
        })*!/

    });*/

    app.get('/', function (req, res) {
        res.status(200).send({
            message: 'Express Welcome',
            user:    req.session.uId
        });
    });

    app.get('/sigUp/:user', function (req, res, next) {
        req.session.uId = req.params.user;
        req.session.save();

        res.status(200).send({
            sessionID: cookie.serialize( 'server.sid', 's:' + signature.sign( req.sessionID, 'super hyper secret string' ) )
        })
    });

    function errorHandler(err, req, res, next) {
        var message;
        var status;

        if (typeof err !== 'object') {
            err = {};
        }

        message = err.message || 'DEFAULT_ERROR_MESSAGE';
        status  = err.status || 500;

        var resObject = {
            error: message
        };

        if (process.env !== 'production') {
            resObject.stack = err.stack;
        }

        res.status(status).send(resObject);
    }

    app.use(errorHandler)
}

module.exports = indexRoute;