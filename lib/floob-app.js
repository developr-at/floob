'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _queue = require('./page/queue');

var _queue2 = _interopRequireDefault(_queue);

var _pluginManager = require('./base/plugin-manager');

var _pluginManager2 = _interopRequireDefault(_pluginManager);

var _consoleLogger = require('./logger/console-logger');

var _consoleLogger2 = _interopRequireDefault(_consoleLogger);

var _appLogger = require('./logger/app-logger');

var _appLogger2 = _interopRequireDefault(_appLogger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Floob Application contains the base functionality of the app.
 */
var FloobApp = {
    // Logger, used to forward output from plugins.
    logger: _appLogger2.default,

    /**
     * Registers plugins
     * @param {object} options App options
     */
    setup: function setup(options) {
        var configPath = process.cwd() + '/floob.config.js';
        if (options.config) {
            configPath = options.config;
        }

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

        config.plugins.forEach(function (f) {
            return _pluginManager2.default.registerPlugin(f.plugin);
        });
    },

    /**
     * Processes the given input options.
     * @param {object} options Options which define what to run.
     */
    process: function process(options) {
        // Validate options
        var url = options.url;

        var self = this;

        _appLogger2.default.setLevel('info');
        _appLogger2.default.info('FloobApp', 'Start processing with options:', options);

        var queue = _queue2.default.create({ url: url, processResult: function processResult(data) {
                _pluginManager2.default.process(data, self.logger);
            } });

        queue.start();
    }
};

exports.default = FloobApp;