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
        var getopt = createOptionSchema();
        var getoptOutput = getopt.parse(args);
        return getoptOutput.options;
    }
};