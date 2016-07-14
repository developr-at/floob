import PluginLogger from '../logger/plugin-logger';
import AppLogger from '../logger/app-logger';

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
     */
    registerPlugin: function(plugin) {
        if (plugin) {
            this.plugins.push(plugin);
        }
    },

    /**
     * Passes the given data to every registered plugin.
     * @param {object} data
     * @param {object} logger Logger used by plugins to provide feedback
     */
    process: function(data, logger) {
        PluginLogger.logger = logger;
        this.plugins.forEach((plugin) => {
            AppLogger.info('PluginManager', `Handling plugin ${plugin.name}`);
            PluginLogger.pluginName = plugin.name;
            plugin.process(data, PluginLogger);
        });
    }
};

export default PluginManager;