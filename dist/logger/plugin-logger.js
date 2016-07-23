"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var PluginLogger = {

    logger: null,

    pluginName: null,

    /**
     * Write verbose information to the log.
     */
    verbose: function verbose() {
        if (this.logger) {
            var _logger;

            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            (_logger = this.logger).verbose.apply(_logger, [this.pluginName].concat(args));
        }
    },

    /**
     * Write information to the log.
     */
    info: function info() {
        if (this.logger) {
            var _logger2;

            for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                args[_key2] = arguments[_key2];
            }

            (_logger2 = this.logger).info.apply(_logger2, [this.pluginName].concat(args));
        }
    },

    /**
     * Write a warning to the log.
     */
    warn: function warn() {
        if (this.logger) {
            var _logger3;

            for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                args[_key3] = arguments[_key3];
            }

            (_logger3 = this.logger).warn.apply(_logger3, [this.pluginName].concat(args));
        }
    },

    /**
     * Write an error to the log.
     */
    error: function error() {
        if (this.logger) {
            var _logger4;

            for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
                args[_key4] = arguments[_key4];
            }

            (_logger4 = this.logger).error.apply(_logger4, [this.pluginName].concat(args));
        }
    }
};

exports.default = PluginLogger;