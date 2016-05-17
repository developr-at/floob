import request from 'request';
import cheerio from 'cheerio';

function mapFetchResult(err, resp, body, url) {
    return {
        url: url,
        status: resp ? resp.statusCode : -1,
        raw: body || err,
        data: body ? cheerio.load(body) : undefined,
    };
}

export default {
    fetch: (url, callback) => {
        request.get(url, function (err, resp, body) {
            callback(mapFetchResult(err, resp, body, url));
        });
    }
};