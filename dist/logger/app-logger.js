'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _npmlog = require('npmlog');

var _npmlog2 = _interopRequireDefault(_npmlog);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Open stream to log file.
var logStream = _fs2.default.createWriteStream('floob.log');

/**
 * General logger for the application.
 */
var AppLogger = {
    /**
     * Set the current log level.
     * @param {string} logLevel The minimum log level.
     */
    setLevel: function setLevel(logLevel) {
        _npmlog2.default.level = logLevel;
    },

    /**
     * Write verbose information to the log.
     */
    verbose: function verbose() {
        _npmlog2.default.verbose.apply(_npmlog2.default, arguments);
    },

    /**
     * Write information to the log.
     */
    info: function info() {
        _npmlog2.default.info.apply(_npmlog2.default, arguments);
    },

    /**
     * Write a warning to the log.
     */
    warn: function warn() {
        _npmlog2.default.warn.apply(_npmlog2.default, arguments);
    },

    /**
     * Write an error to the log.
     */
    error: function error() {
        _npmlog2.default.error.apply(_npmlog2.default, arguments);
    }
};

/**
 * Listen on log event and write log message to file.
 */
_npmlog2.default.on('log', function (blob) {
    var level = blob.level;
    var prefix = blob.prefix;
    var message = blob.message;

    var logEntry = '[' + level.toUpperCase() + '] ' + prefix + ' - ' + message + '\n\r';

    logStream.write(logEntry);
});

exports.default = AppLogger;