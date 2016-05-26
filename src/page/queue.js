import PageFetcher from './fetcher';
import PageLinkExtractor from './link-extractor';
import { extractDomain, haveSameDomain, isAbsoluteUrl } from '../util/url-helper';



const PageQueue = {
    create: (options) => {
        // List of URLs we still need to process
        const urlsToProcess = [];
        // List of URLs we have already processed
        const processedUrls = [];
        // Callback to externally process page result
        let processResultFn;
        // Domain from which we want to process the URLs
        let domainToProcess;

        const queue = {
            get urlsToProcess () {
                return urlsToProcess.slice();
            },

            clear: () => {
                urlsToProcess.splice(0, urlsToProcess.length);
            },

            convertRelativeToAbsoluteUrl: (relativeUrl) => {
                if (!domainToProcess) {
                    return relativeUrl;
                }

                // TODO: Fix hardcoded http://
                return `http://${domainToProcess}${relativeUrl}`;
            },

            enqueue: (url, processResult) => {
                // Ignore javascript links
                if (url.startsWith('javascript:')) {
                    return false;
                }

                const absoluteUrl = isAbsoluteUrl(url) ? url : queue.convertRelativeToAbsoluteUrl(url);

                if (!haveSameDomain(domainToProcess, absoluteUrl)) {
                    return false;
                }

                // Check already processed
                if (!!processedUrls && processedUrls.indexOf(absoluteUrl) !== -1) {
                    return false;
                }

                // Check already in queue
                if (!!urlsToProcess && urlsToProcess.indexOf(absoluteUrl) !== -1) {
                    return false;
                }

                urlsToProcess.push(absoluteUrl);
                return true;
            },

            start: () => {
                if (!domainToProcess || !processResultFn) {
                    throw Error('PageQueue hasn\'t been setup correctly. Please provide "domainToProcess" and "processResultFn"');
                }

                processNext();
            }
        };

        setup(options);

        return queue;

        function setup(setupOptions) {
            if (!setupOptions) {
                throw Error(`Please provide at least 'url' and 'processResult' as options.`);
            }

            const { url, processResult } = setupOptions;

            domainToProcess = extractDomain(url);
            processResultFn = processResult;

            queue.enqueue(url);
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
                        .forEach(queue.enqueue);
                }

                if (urlsToProcess.length > 0) {
                    processNext();
                }
            });
        }
    }
};

export default PageQueue;