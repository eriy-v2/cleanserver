/**
 * Created by eriy on 10.11.15.
 */
var path    = require('path');
var cluster = require('cluster');
var os      = require('os');
var i;

if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = 'development';
}
process.env.NODE_ENV = process.env.NODE_ENV.toLowerCase();

require(path.join(__dirname, 'config', process.env.NODE_ENV));

if (process.env.CLUSTER === 'true') {

    if (cluster.isMaster) {

        var cpuCount = os.cpus().length;

        for (i = cpuCount;i--;) {
            cluster.fork();
        }

        cluster.on('exit', function (worker) {
            console.log('Worker ' + worker.id + ' died :(');
            cluster.fork();
        });

        cluster.on('online', function (worker) {
            console.log("The worker" + worker.id + " responded after it was forked");
        });

        cluster.on('listening', function (worker, address) {
            console.log("A worker " + worker.id + " is now connected to " + address.address + ":" + address.port);
        });

    } else {
        require('./app')();
    }
} else {

    require('./app')();

}