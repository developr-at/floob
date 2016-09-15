'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _cheerio = require('cheerio');

var _cheerio2 = _interopRequireDefault(_cheerio);

var _cookieHelper = require('../util/cookie-helper');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Global application configuration
var config = {};

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
 * Prepares the request headers.
 * Currently only cookie value can be set.
 * @param {object} cookieData Cookie values as an object.
 * @return {object} Headers for http request.
 */
function prepareRequestHeaders() {
    var cookieData = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    return {
        cookie: (0, _cookieHelper.getCookieString)(cookieData)
    };
}

/**
 * PageFetcher is responsible for loading pages.
 */
var PageFetcher = {
    /**
     * Creates a new PageFetcher with the given options.
     * @param {object} options Options to initialize the queue with.
     * @return New PageFetcher object.
     */
    create: function create(options) {
        var fetcher = {
            /**
             * Configures the page fetcher.
             * @param {object} appConfig The global configuration.
             */
            setup: function setup() {
                var appConfig = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

                config = appConfig;
            },

            /**
             * Fetch a single page from the given url and call
             * the given callback with the result object.
             * @param {string} url The URL to fetch the page from.
             * @param {Function} callback Callback to call with the result.
             */
            fetch: function fetch(url, callback) {
                var headers = prepareRequestHeaders(config.cookie);

                _request2.default.get({ url: url, headers: headers }, function (err, resp, body) {
                    callback(mapFetchResult(err, resp, body, url));
                });
            }
        };

        return fetcher;
    }
};

exports.default = PageFetcher;