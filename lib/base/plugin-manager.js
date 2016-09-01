'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _pluginLogger = require('../logger/plugin-logger');

var _pluginLogger2 = _interopRequireDefault(_pluginLogger);

var _appLogger = require('../logger/app-logger');

var _appLogger2 = _interopRequireDefault(_appLogger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Allows registration of plugins and passes all needed data to every registered plugin.
 * @type {object}
 */
var PluginManager = {
    /**
     * List of registered plugins
     * @type {array}
     */
    plugins: [],

    /**
     * Registers a new plugin that should be invoked for every handled page.
     * @param {object} plugin Plugin object
     * @param {object} pluginConfig Configuration for the specific plugin
     */
    registerPlugin: function registerPlugin(plugin) {
        var pluginConfig = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

        if (plugin) {
            this.plugins.push(plugin);

            if (plugin.configure) {
                // For now pass {} for globalConfig
                plugin.configure(pluginConfig, {});
            }
        }
    },

    /**
     * Passes the given data to every registered plugin.
     * @param {object} data
     * @param {object} logger Logger used by plugins to provide feedback
     */
    process: function process(data, logger) {
        _pluginLogger2.default.logger = logger;
        this.plugins.forEach(function (plugin) {
            _appLogger2.default.info('PluginManager', 'Handling plugin ' + plugin.name);
            _pluginLogger2.default.pluginName = plugin.name;
            plugin.process(data, _pluginLogger2.default);
        });
    }
};

exports.default = PluginManager;