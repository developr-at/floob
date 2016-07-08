import PluginLogger from '../logger/plugin-logger';
import AppLogger from '../logger/app-logger';

/**
 * Allows registration of plugins and passes all needed data to every registered plugin.
 * @type {object}
 */
var PluginManager = {

    /**
     * Directory containing plugins
     * @type {string}
     */
    pluginDirectory: './src/plugin',

    /**
     * List of registered plugins
     * @type {array}
     */
    plugins: [],

    /**
     * Loads every plugin from plugin directory and registers it.
     * (TODO)
     * @param {object} options App options
     * @param {function} done Done callback
     */
    setup: function(options, done)  {
        // TODO: Dynmaic loading of plugins (not possible at the moment)
        done();
    },

    /**
     * Registers a new plugin that should be invoked for every handled page.
     * @param {object} plugin Plugin object
     */
    registerPlugin: function(plugin) {
        this.plugins.push(plugin);
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