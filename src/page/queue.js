import PageFetcher from './fetcher';
import PageLinkExtractor from './link-extractor';
import { extractDomain } from '../util/url-helper';

// List of URLs we still need to process
const urlsToProcess = [];
// List of URLs we have already processed
const processedUrls = [];
// Callback to externally process page result
let processResultFn;
// Domain from which we want to process the URLs
let domainToProcess;

function enqueueUrl(url) {
    console.log(`Enqueue ${url}`);

    // // Ignore javascript links
    // if (url.startsWith('javascript:')) {
    //     return false;
    // }

    // // TODO: Resolve relative links
    // const domain = extractDomain(url);

    // // Check domain
    // if (!!domainToProcess && domainToProcess !== domain) {
    //     return false;
    // }

    // // Check already processed
    // if (!!processedUrls && processedUrls.includes(url)) {
    //     return false;
    // }

    urlsToProcess.push(url);
}

function processNext() {
    const url = urlsToProcess.shift();

    PageFetcher.fetch(url, (pageResult) => {
        processResultFn(pageResult);

        const { status, url, raw } = pageResult;

        processedUrls.push(url);

        if (status != -1) {
            PageLinkExtractor.extractLinks(raw)
                .map((s) => s.trim())
                .forEach(enqueueUrl);
        }

        if (urlsToProcess.length > 0) {
            processNext();
        }
    });
}

export default {
    enqueue: (url, processResult) => {
        domainToProcess = extractDomain(url);
        processResultFn = processResult;

        enqueueUrl(url);
        processNext();
    }
}