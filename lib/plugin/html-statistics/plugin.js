'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var htmlStatistics = {

    /**
     * Name of this plugin used in logger
     * @type {string}
     */
    name: 'HTML Statistics',

    /**
     * Returns the size of a given string in bytes.
     * @param str String
     * @returns {int} size in bytes
     */
    stringSize: function stringSize(str) {
        return Buffer.byteLength(str, 'utf8');
    },

    /**
     * Processes a single html page and outputs statistic information.
     * @param {object} data
     * @param {object} logger
     */
    process: function process(data, logger) {
        logger.info('Handling page ' + data.url + ':');
        logger.info('-- Size of page: ' + this.stringSize(data.raw / 1000) + 'kb');
        logger.info('-- Characters in page: ' + data.raw.length);
        logger.info('-- Number of links in page: ' + data.data('a').length);
    }
};

exports.default = htmlStatistics;