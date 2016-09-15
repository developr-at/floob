'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getCookieString = getCookieString;
/**
 * Converts the given object into a cookieString.
 * @param {object} data Object to convert.
 * @return {string} Cookiestring in format: "key=value; key=value"
 */
function getCookieString() {
    var data = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    var cookieString = '';

    for (var prop in data) {
        if (data.hasOwnProperty(prop)) {
            cookieString += prop + '=' + data[prop] + '; ';
        }
    }

    return cookieString;
}