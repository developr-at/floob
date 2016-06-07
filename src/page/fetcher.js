import request from 'request';
import cheerio from 'cheerio';

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
 * PageFetcher is responsible for loading pages.
 */
export default {
    /**
     * Fetch a single page from the given url and call
     * the given callback with the result object.
     * @param {string} url The URL to fetch the page from.
     * @param {Function} callback Callback to call with the result.
     */
    fetch: (url, callback) => {
        request.get(url, function (err, resp, body) {
            callback(mapFetchResult(err, resp, body, url));
        });
    }
};