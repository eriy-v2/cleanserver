/**
 * Created by eriy on 11.11.15.
 */
process.env.PORT            = parseInt(process.env.PORT, 10)|0 || 8888;
process.env.HTTPS_PORT      = parseInt(process.env.HTTPS_PORT, 10)|0 || 8443;
process.env.DOMAIN          = process.env.DOMAIN || 'localhost';
process.env.HTTP            = process.env.HTTP || 'true';
process.env.HTTPS           = process.env.HTTPS || 'true';
process.env.HOST            = process.env.HOST || 'http://' + process.env.DOMAIN + ':' + process.env.PORT;
process.env.HTTPS_HOST      = process.env.HTTPS_HOST || 'https://' + process.env.DOMAIN + ':' + process.env.HTTPS_PORT;
process.env.SERVER_CERT     = process.env.SERVER_CERT || false;
process.env.CLUSTER         = process.env.CLUSTER || false;
process.env.HTTPS_KEY_FILE  = process.env.HTTPS_KEY_FILE || 'key.pem';
process.env.HTTPS_CERT_FILE = process.env.HTTPS_CERT_FILE || 'cert.crt';
