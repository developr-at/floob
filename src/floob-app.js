import fs from 'fs';
import readline from 'readline';
import PageQueue from './page/queue';
import PluginManager from './base/plugin-manager';
import AppLogger from './logger/app-logger';

let appConfig;

/**
 * Floob Application contains the base functionality of the app.
 */
var FloobApp = {
    // Logger, used to forward output from plugins.
    logger: AppLogger,

    // Current page queue.
    queue: {},

    /**
     * Registers plugins
     * @param {object} options App options
     */
    setup: function(options) {
        let configPath = process.cwd() + '/floob.config.js';
        if (options.config) {
            configPath = options.config;
        }

        // Try to load configuration
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

        appConfig = config.options || {};

        // Attach plugins
        config.plugins.forEach(f => PluginManager.registerPlugin(f.plugin, f.options || {}, appConfig));
    },

    /**
     * Outputs the updated progress log message.
     * @param {string} url The url which is currently processed.
     * @param {string} currenctAction Message for the current action.
     */
    updateProgressLog: function (url, currentAction) {
        readline.clearLine(process.stdout, 0);
        readline.cursorTo(process.stdout, 0)
        process.stdout.write(`Processing ${url} [${this.queue.processedUrlsCount}/${this.queue.urlsTotalCount}]: ${currentAction}`);
    },

    /**
     * Processes the given input options.
     * @param {object} options Options which define what to run.
     */
    process: function(options) {
        // Validate options
        const { url } = options;
        const self = this;

        AppLogger.setLevel('silent');
        AppLogger.info('FloobApp', 'Start processing with options:', options);

        // Create queue and start processing
        this.queue = PageQueue.create({ url, appConfig, processResult: (data) => {
            PluginManager.process(data, self.logger);
        }});

        this.queue.start();
    }
};

export default FloobApp;
