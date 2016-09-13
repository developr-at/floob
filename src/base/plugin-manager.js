import PluginLogger from '../logger/plugin-logger';
import AppLogger from '../logger/app-logger';
import FloobApp from '../floob-app';

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
     * @param {object} globalConfig Configuration for the application
     */
    registerPlugin: function(plugin, pluginConfig = {}, globalConfig = {}) {
        if (plugin) {
            this.plugins.push(plugin);

            if (plugin.configure) {
                // For now pass {} for globalConfig
                plugin.configure(pluginConfig, {});
            }
        }
    },

    /**
     * Invokes the start callback of every plugin.
     * @param {object} queue PageQueue
     * @param {object} logger Logger used by plugins to provide feedback
     */
    start: function(queue, logger) {
        PluginLogger.logger = logger;
        AppLogger.info('Starting plugins');
        this.plugins.forEach((plugin) => {
            if (typeof plugin.start !== 'function') {
                return;
            }

            AppLogger.info('PluginManager', `Starting plugin ${plugin.name}`);
            PluginLogger.pluginName = plugin.name;
            plugin.start(queue, PluginLogger);
        });
    },

    /**
     * Passes the given data to every registered plugin.
     * @param {object} data
     * @param {object} logger Logger used by plugins to provide feedback
     */
    process: function(data, logger) {
        PluginLogger.logger = logger;
        FloobApp.updateProgressLog(data.url, 'Processing plugins');
        this.plugins.forEach((plugin) => {
            if (typeof plugin.process !== 'function') {
                return;
            }

            AppLogger.info('PluginManager', `Handling plugin ${plugin.name}`);
            PluginLogger.pluginName = plugin.name;
            plugin.process(data, PluginLogger);
        });
    },

    /**
     * Invokes the finish callback of every plugin.
     * @param {object} logger Logger used by plugins to provide feedback
     */
    finish: function(logger) {
        PluginLogger.logger = logger;
        AppLogger.info('Finishing plugins');
        this.plugins.forEach((plugin) => {
            if (typeof plugin.finish !== 'function') {
                return;
            }

            AppLogger.info('PluginManager', `Finishing plugin ${plugin.name}`);
            PluginLogger.pluginName = plugin.name;
            plugin.finish(PluginLogger);
        });
    }
};

export default PluginManager;