// http://stackoverflow.com/a/23945027/733368
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

export function haveSameDomain(baseUrl, urlToCompare) {
    return extractDomain(baseUrl) === extractDomain(urlToCompare);
}

// http://stackoverflow.com/a/10687137/733368
export function isAbsoluteUrl(url) {
    const absoluteRegEx = /^(?:[a-z]+:)?\/\//i;
    return absoluteRegEx.test(url);
}