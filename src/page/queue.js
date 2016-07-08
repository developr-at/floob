import UrlHelper from 'url';
import PageFetcher from './fetcher';
import PageLinkExtractor from './link-extractor';
import AppLogger from '../logger/app-logger';
import { isAbsoluteUrl } from '../util/url-helper';

/**
 * PageQueue is responsible for processing a list of pages.
 */
const PageQueue = {
    /**
     * Creates a new PageQueue with the given options.
     * @param {object} options Options to initialize the queue with.
     * @return New PageQueue object.
     */
    create: (options) => {
        // List of URLs we still need to process
        const urlsToProcess = [];
        // List of URLs we have already processed
        const processedUrls = [];
        // Callback to externally process page result
        let processResultFn;
        // Base URL to process.
        let baseUrl;

        const queue = {
            /**
             * Returns a clone of the current list of urls which are scheduled
             * for processing.
             * @return List of urls to be processed.
             */
            get urlsToProcess () {
                return urlsToProcess.slice();
            },

            /**
             * Clears the current list of urls to process.
             */
            clear: () => {
                urlsToProcess.splice(0, urlsToProcess.length);
            },

            /**
             * Converts a given relative url to an absolute url.
             * @param {string} relativeUrl Relative URL.
             * @return Absolute URL.
             */
            convertRelativeToAbsoluteUrl: (relativeUrl) => {
                if (!baseUrl) {
                    return relativeUrl;
                }

                return UrlHelper.format(UrlHelper.resolve(baseUrl, relativeUrl));
            },

            /**
             * Enqueues the given url if it satisfies various conditions.
             * @param {string} url URL to add.
             * @return True if the url could be added; False otherwise.
             */
            enqueue: (url) => {
                // Ignore javascript links
                if (url.startsWith('javascript:')) {
                    AppLogger.verbose('PageQueue', `Ignore javascript url: ${url}`);
                    return false;
                }

                const absoluteRawUrl = isAbsoluteUrl(url) ? url : queue.convertRelativeToAbsoluteUrl(url);
                const absoluteUrl = UrlHelper.parse(absoluteRawUrl);

                if (baseUrl.hostname !== absoluteUrl.hostname) {
                    AppLogger.verbose('PageQueue', `Ignore url from different domain: ${url}`);
                    return false;
                }

                // Check already processed
                if (!!processedUrls && processedUrls.indexOf(absoluteRawUrl) !== -1) {
                    AppLogger.verbose('PageQueue', `Ignore already processed url: ${url}`);
                    return false;
                }

                // Check already in queue
                if (!!urlsToProcess && urlsToProcess.indexOf(absoluteRawUrl) !== -1) {
                    AppLogger.verbose('PageQueue', `Ignore already enqueued url: ${url}`);
                    return false;
                }

                AppLogger.verbose('PageQueue', `Enqueuing url ${absoluteRawUrl}`);
                urlsToProcess.push(absoluteRawUrl);
                return true;
            },

            /**
             * Starts the processing of the enqueued urls.
             */
            start: () => {
                if (!baseUrl || !processResultFn) {
                    AppLogger.error('PageQueue', 'PageQueue hasn\'t been setup correctly. Please provide "url" and "processResultFn"');
                    throw Error('PageQueue hasn\'t been setup correctly. Please provide "url" and "processResultFn"');
                }

                processNext();
            }
        };

        setup(options);

        return queue;

        /**
         * Setup the PageQueue with the given options.
         * @param {object} setupOptions Options for the queue processing.
         */
        function setup(setupOptions) {
            if (!setupOptions) {
                AppLogger.error('PageQueue', `Please provide at least 'url' and 'processResult' as options.`);
                throw Error(`Please provide at least 'url' and 'processResult' as options.`);
            }

            const { url, processResult } = setupOptions;

            baseUrl = UrlHelper.parse(url);
            processResultFn = processResult;

            queue.enqueue(url);
        }

        /**
         * Tries to fetch the next url.
         */
        function processNext() {
            const url = urlsToProcess.shift();

            PageFetcher.fetch(url, (pageResult) => {
                processResultFn(pageResult);

                const { status, url, raw } = pageResult;

                processedUrls.push(url);

                if (status != -1) {
                    const links = PageLinkExtractor.extractLinks(raw)
                        .map((s) => s.trim());

                    AppLogger.verbose('PageQueue', `Found ${links.length} links on ${url}`);

                    links.forEach(queue.enqueue);
                }

                if (urlsToProcess.length > 0) {
                    processNext();
                } else {
                    AppLogger.info('PageQueue', 'No more urls to process found!');
                }
            });
        }
    }
};

export default PageQueue;