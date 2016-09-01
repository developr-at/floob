import fs from 'fs';
import PageQueue from './page/queue';
import PluginManager from './base/plugin-manager';
import ConsoleLogger from './logger/console-logger';
import AppLogger from './logger/app-logger';

/**
 * Floob Application contains the base functionality of the app.
 */
var FloobApp = {
    // Logger, used to forward output from plugins.
    logger: AppLogger,

    /**
     * Registers plugins
     * @param {object} options App options
     */
    setup: function(options) {
        let configPath = process.cwd() + '/floob.config.js';
        if (options.config) {
            configPath = options.config;
        }

        let config;
        try {
            config = require(configPath);
        } catch (e) {
            // TODO...
            throw new Error(`Failed to load config file "${configPath}"`);
        }

        if (!config.plugins || config.plugins.length === 0) {
            throw new Error(`No plugins found in "${configPath}". Please specify plugins to execute.`);
        }

        config.plugins.forEach(f => PluginManager.registerPlugin(f.plugin, f.options || {}));
    },

    /**
     * Processes the given input options.
     * @param {object} options Options which define what to run.
     */
    process: function(options) {
        // Validate options
        const { url } = options;
        const self = this;

        AppLogger.setLevel('info');
        AppLogger.info('FloobApp', 'Start processing with options:', options);

        const queue = PageQueue.create({ url, processResult: (data) => {
            PluginManager.process(data, self.logger);
        }});

        queue.start();
    }
};

export default FloobApp;
