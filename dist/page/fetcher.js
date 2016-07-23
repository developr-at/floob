'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _cheerio = require('cheerio');

var _cheerio2 = _interopRequireDefault(_cheerio);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Maps the given parameters to a FetchResult object.
 * @param {object} err Error object.
 * @param {object} resp Http response.
 * @param {string} body Content of the response.
 * @param {string} url Requested URL.
 * @return Custom FetchResult object.
 */
function mapFetchResult(err, resp, body, url) {
    return {
        url: url,
        status: resp ? resp.statusCode : -1,
        raw: body || err,
        data: body ? _cheerio2.default.load(body) : undefined
    };
}

/**
 * PageFetcher is responsible for loading pages.
 */
exports.default = {
    /**
     * Fetch a single page from the given url and call
     * the given callback with the result object.
     * @param {string} url The URL to fetch the page from.
     * @param {Function} callback Callback to call with the result.
     */
    fetch: function fetch(url, callback) {
        _request2.default.get(url, function (err, resp, body) {
            callback(mapFetchResult(err, resp, body, url));
        });
    }
};