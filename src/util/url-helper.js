/**
 * Extracts the domain part of a given absolute url.
 * Source: http://stackoverflow.com/a/23945027/733368
 * @param {string} url URL to extract the domain from.
 * @return Domain part of the given url.
 */
export function extractDomain(url) {
    let domain;

    if (url.indexOf("://") > -1) {
        domain = url.split('/')[2];
    } else {
        domain = url.split('/')[0];
    }

    // Find & remove port number
    domain = domain.split(':')[0];
    return domain;
}

/**
 * Checks if two URLs have the same domain.
 * @param {string} baseUrl First url to compare.
 * @param {string} urlToCompare Second url to compare.
 * @return True if both urls have the same domain; False otherwise.
 */
export function haveSameDomain(baseUrl, urlToCompare) {
    return extractDomain(baseUrl) === extractDomain(urlToCompare);
}

/**
 * Check if a given url is an absolute url (with protocol).
 * Source: http://stackoverflow.com/a/10687137/733368
 * @param {string} url The url to check.
 * @return True if the url is absolute (has a protocol); False otherwise.
 */
export function isAbsoluteUrl(url) {
    const absoluteRegEx = /^(?:[a-z]+:)?\/\//i;
    return absoluteRegEx.test(url);
}