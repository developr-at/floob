import npmlog from 'npmlog';
import fs from 'fs';

// Open stream to log file.
const logStream = fs.createWriteStream('floob.log');

/**
 * General logger for the application.
 */
const AppLogger = {
    /**
     * Set the current log level.
     * @param {string} logLevel The minimum log level.
     */
    setLevel: (logLevel) => {
        npmlog.level = logLevel;
    },

    /**
     * Write verbose information to the log.
     */
    verbose: (...args) => {
        npmlog.verbose(...args);
    },

    /**
     * Write information to the log.
     */
    info: (...args) => {
        npmlog.info(...args);
    },


    /**
     * Write a warning to the log.
     */
    warn: (...args) => {
        npmlog.warn(...args);
    },

    /**
     * Write an error to the log.
     */
    error: (...args) => {
        npmlog.error(...args);
    }
};

/**
 * Listen on log event and write log message to file.
 */
npmlog.on('log', (blob) => {
    const { level, prefix, message } = blob;
    const logEntry = `[${level.toUpperCase()}] ${prefix} - ${message}\n\r`;

    logStream.write(logEntry);
});

export default AppLogger;