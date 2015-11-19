/**
 * Created by eriy on 17.11.15.
 */
// Filename: main.js

// Require.js allows us to configure shortcut alias
// There usage will become more apparent further along in the tutorial.
require.config({
    paths: {
        jquery: 'libs/jquery/dist/jquery',
        underscore: 'libs/underscore/underscore',
        backbone: 'libs/backbone/backbone',
        text: 'libs/text/text',
        templates: '../templates/',
        views: 'views/'

    },
    shim: {
        backbone: {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        underscore: {
            exports: '_'
        },
        jquery: {
            exports: '$'
        }
    }

});

require([
    'app'
], function(App){
    App.initialize();
});