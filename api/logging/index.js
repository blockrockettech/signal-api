const {createLogger, format, transports} = require('winston');
const {combine, timestamp, printf} = format;

// Config
const config = require('config');
const loggingConfig = config.get('logging');

// Logging formatter
const customFormat = printf(info => {
    return `${info.timestamp} - ${info.level}: ${info.message}`;
});

const logger = createLogger({
    format: combine(
        format.splat(),
        format.simple(),
        timestamp(),
        customFormat
    ),
    transports: [
        // Log all to console
        new transports.Console({
            level: 'debug',
        }),

        // Only log info to application log
        new transports.File({
            filename: loggingConfig.defaultLog,
            level: 'info',
        }),

        // Log all errors to errors.log
        new transports.File({
            filename: loggingConfig.errorLog,
            level: 'error',

        })
    ],

});

module.exports = logger;
