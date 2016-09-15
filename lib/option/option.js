'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _nodeGetopt = require('node-getopt');

var _nodeGetopt2 = _interopRequireDefault(_nodeGetopt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Creates the schema for the parsing of the command line arguments.
 * @return Schema for the options.
 */
function createOptionSchema() {
    return new _nodeGetopt2.default([['c', 'config=ARG', 'Absolute path to config file'], ['h', 'help', 'Output usage information'], ['u', 'url=ARG', 'URL to scan']]);
}

var getOpt = {};

/**
 * Wrapper for Options.
 */
exports.default = {
    /**
     * Parses the given command line arguments into options.
     * @param {string} args Command line arguments.
     * @return Object containing the extracted options.
     */
    parse: function parse(args) {
        getOpt = createOptionSchema();
        var getOptOutput = getOpt.parse(args);

        return getOptOutput.options;
    },

    /**
     * Prints the help information for all available cli parameter
     */
    showHelp: function showHelp() {
        if (getOpt.showHelp) {
            getOpt.showHelp();
        }
    }
};