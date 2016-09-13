'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _readline = require('readline');

var _readline2 = _interopRequireDefault(_readline);

var _queue = require('./page/queue');

var _queue2 = _interopRequireDefault(_queue);

var _pluginManager = require('./base/plugin-manager');

var _pluginManager2 = _interopRequireDefault(_pluginManager);

var _appLogger = require('./logger/app-logger');

var _appLogger2 = _interopRequireDefault(_appLogger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var appConfig = void 0;

/**
 * Floob Application contains the base functionality of the app.
 */
var FloobApp = {
    // Logger, used to forward output from plugins.
    logger: _appLogger2.default,

    // Current page queue.
    queue: {},

    /**
     * Registers plugins
     * @param {object} options App options
     */
    setup: function setup(options) {
        var configPath = process.cwd() + '/floob.config.js';
        if (options.config) {
            configPath = options.config;
        }

        // Try to load configuration
        var config = void 0;
        try {
            config = require(configPath);
        } catch (e) {
            // TODO...
            throw new Error('Failed to load config file "' + configPath + '"');
        }

        if (!config.plugins || config.plugins.length === 0) {
            throw new Error('No plugins found in "' + configPath + '". Please specify plugins to execute.');
        }

        appConfig = config.options || {};

        // Attach plugins
        config.plugins.forEach(function (f) {
            return _pluginManager2.default.registerPlugin(f.plugin, f.options || {}, appConfig);
        });
    },

    /**
     * Outputs the updated progress log message.
     * @param {string} url The url which is currently processed.
     * @param {string} currenctAction Message for the current action.
     */
    updateProgressLog: function updateProgressLog(url, currentAction) {
        _readline2.default.clearLine(process.stdout, 0);
        _readline2.default.cursorTo(process.stdout, 0);
        process.stdout.write('Processing ' + url + ' [' + this.queue.processedUrlsCount + '/' + this.queue.urlsLimit + ']: ' + currentAction);
    },

    /**
     * Processes the given input options.
     * @param {object} options Options which define what to run.
     */
    process: function process(options) {
        // Validate options
        var url = options.url;

        var self = this;

        _appLogger2.default.setLevel('silent');
        _appLogger2.default.info('FloobApp', 'Start processing with options:', options);

        // Create queue and start processing
        this.queue = _queue2.default.create({ url: url, appConfig: appConfig, processResult: function processResult(data) {
                _pluginManager2.default.process(data, self.logger);
            }, finished: function finished() {
                _pluginManager2.default.finish(self.logger);
            } });

        this.queue.start();
    }
};

exports.default = FloobApp;