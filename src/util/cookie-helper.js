/**
 * Converts the given object into a cookieString.
 * @param {object} data Object to convert.
 * @return {string} Cookiestring in format: "key=value; key=value"
 */
export function getCookieString(data = {}) {
    let cookieString = '';

    for (let prop in data) {
        if (data.hasOwnProperty(prop)) {
            cookieString += `${prop}=${data[prop]}; `;
        }
    }

    return cookieString;
}