import request from 'request';
import cheerio from 'cheerio';
import { getCookieString } from '../util/cookie-helper'

// Global application configuration
let config = {};

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
        data: body ? cheerio.load(body) : undefined,
    };
}

/**
 * Prepares the request headers.
 * Currently only cookie value can be set.
 * @param {object} cookieData Cookie values as an object.
 * @return {object} Headers for http request.
 */
function prepareRequestHeaders(cookieData = {}) {
    return {
        cookie: getCookieString(cookieData)
    };
}

/**
 * PageFetcher is responsible for loading pages.
 */
const PageFetcher = {
    /**
     * Creates a new PageFetcher with the given options.
     * @param {object} options Options to initialize the queue with.
     * @return New PageFetcher object.
     */
    create: (options) => {
        const fetcher = {
            /**
             * Configures the page fetcher.
             * @param {object} appConfig The global configuration.
             */
            setup: (appConfig = {}) => {
                config = appConfig;
            },

            /**
             * Fetch a single page from the given url and call
             * the given callback with the result object.
             * @param {string} url The URL to fetch the page from.
             * @param {Function} callback Callback to call with the result.
             */
            fetch: (url, callback) => {
                let headers = prepareRequestHeaders(config.cookie);
                let requestData = {
                    url,
                    headers,
                    rejectUnauthorized: !config.ignoreSslErrors
                };

                request.get(requestData, function (err, resp, body) {
                    callback(mapFetchResult(err, resp, body, url));
                });
            }
        };

        return fetcher;
    }
}

export default PageFetcher;