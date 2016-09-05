'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

var _floobApp = require('../floob-app');

var _floobApp2 = _interopRequireDefault(_floobApp);

var _fetcher = require('./fetcher');

var _fetcher2 = _interopRequireDefault(_fetcher);

var _linkExtractor = require('./link-extractor');

var _linkExtractor2 = _interopRequireDefault(_linkExtractor);

var _appLogger = require('../logger/app-logger');

var _appLogger2 = _interopRequireDefault(_appLogger);

var _urlHelper = require('../util/url-helper');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * PageQueue is responsible for processing a list of pages.
 */
var PageQueue = {
    /**
     * Creates a new PageQueue with the given options.
     * @param {object} options Options to initialize the queue with.
     * @return New PageQueue object.
     */
    create: function create(options) {
        // List of URLs we still need to process
        var urlsToProcess = [];
        // List of URLs we have already processed
        var processedUrls = [];
        // Callback to externally process page result
        var processResultFn = void 0;
        // Base URL to process.
        var baseUrl = void 0;

        var queue = {
            /**
             * Returns a clone of the current list of urls which are scheduled
             * for processing.
             * @return List of urls to be processed.
             */
            get urlsToProcess() {
                return urlsToProcess.slice();
            },

            /**
             * Returns the number of urls which need to be processed.
             * @return Number of URLs to process.
             */
            get urlsToProcessCount() {
                return urlsToProcess.length;
            },

            /**
             * Returns the number of urls which were already processed.
             * @return Number of processed URLs.
             */
            get processedUrlsCount() {
                return processedUrls.length;
            },

            /**
             * Returns the combined number of processed and still outstanding URLs.
             * @return Total number of URLs.
             */
            get urlsTotalCount() {
                return urlsToProcess.length + processedUrls.length;
            },

            /**
             * Clears the current list of urls to process.
             */
            clear: function clear() {
                urlsToProcess.splice(0, urlsToProcess.length);
            },

            /**
             * Converts a given relative url to an absolute url.
             * @param {string} relativeUrl Relative URL.
             * @return Absolute URL.
             */
            convertRelativeToAbsoluteUrl: function convertRelativeToAbsoluteUrl(relativeUrl) {
                if (!baseUrl) {
                    return relativeUrl;
                }

                return _url2.default.format(_url2.default.resolve(baseUrl, relativeUrl));
            },

            /**
             * Enqueues the given url if it satisfies various conditions.
             * @param {string} url URL to add.
             * @return True if the url could be added; False otherwise.
             */
            enqueue: function enqueue(url) {
                // Ignore javascript links
                if (url.startsWith('javascript:')) {
                    _appLogger2.default.verbose('PageQueue', 'Ignore javascript url: ' + url);
                    return false;
                }

                var absoluteRawUrl = (0, _urlHelper.isAbsoluteUrl)(url) ? url : queue.convertRelativeToAbsoluteUrl(url);
                var absoluteUrl = _url2.default.parse(absoluteRawUrl);

                if (baseUrl.hostname !== absoluteUrl.hostname) {
                    _appLogger2.default.verbose('PageQueue', 'Ignore url from different domain: ' + url);
                    return false;
                }

                // Check already processed
                if (!!processedUrls && processedUrls.indexOf(absoluteRawUrl) !== -1) {
                    _appLogger2.default.verbose('PageQueue', 'Ignore already processed url: ' + url);
                    return false;
                }

                // Check already in queue
                if (!!urlsToProcess && urlsToProcess.indexOf(absoluteRawUrl) !== -1) {
                    _appLogger2.default.verbose('PageQueue', 'Ignore already enqueued url: ' + url);
                    return false;
                }

                _appLogger2.default.verbose('PageQueue', 'Enqueuing url ' + absoluteRawUrl);
                urlsToProcess.push(absoluteRawUrl);
                return true;
            },

            /**
             * Starts the processing of the enqueued urls.
             */
            start: function start() {
                if (!baseUrl || !processResultFn) {
                    _appLogger2.default.error('PageQueue', 'PageQueue hasn\'t been setup correctly. Please provide "url" and "processResultFn"');
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
                _appLogger2.default.error('PageQueue', 'Please provide at least \'url\' and \'processResult\' as options.');
                throw Error('Please provide at least \'url\' and \'processResult\' as options.');
            }

            var url = setupOptions.url;
            var processResult = setupOptions.processResult;


            baseUrl = _url2.default.parse(url);
            processResultFn = processResult;

            queue.enqueue(url);
        }

        /**
         * Tries to fetch the next url.
         */
        function processNext() {
            var url = urlsToProcess.shift();

            _floobApp2.default.updateProgressLog(url, 'Fetching page');
            _fetcher2.default.fetch(url, function (pageResult) {
                processResultFn(pageResult);

                var status = pageResult.status;
                var url = pageResult.url;
                var raw = pageResult.raw;


                processedUrls.push(url);

                if (status != -1) {
                    _floobApp2.default.updateProgressLog(url, 'Extracting links');
                    var links = _linkExtractor2.default.extractLinks(raw).map(function (s) {
                        return s.trim();
                    });

                    _appLogger2.default.verbose('PageQueue', 'Found ' + links.length + ' links on ' + url);

                    links.forEach(queue.enqueue);
                }

                if (urlsToProcess.length > 0) {
                    processNext();
                } else {
                    _appLogger2.default.info('PageQueue', 'No more urls to process found!');
                }
            });
        }
    }
};

exports.default = PageQueue;