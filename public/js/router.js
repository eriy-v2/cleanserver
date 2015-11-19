/**
 * Created by eriy on 17.11.15.
 */
define([
    'backbone'
], function (Backbone) {
    "use strict";
    var AppRouter = Backbone.Router.extend({
        routes: {
            'help' : "help",
            '*notFound': "notFound"
        }
    });

    var initialize = function() {
        var router = new AppRouter();

        router.on('route:help', function() {
            console.log('HELP');
        });

        router.on('route:notFound', function(badURL) {
            console.log('Bad URL: ' + badURL);
        });

        Backbone.history.start();
    };

    return {
        initialize: initialize
    }
});