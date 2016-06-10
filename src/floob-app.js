import PageQueue from './page/queue';
import PluginManager from './base/PluginManager';
import ConsoleLogger from './logger/ConsoleLogger';
import AppLogger from './logger/app-logger';

/**
 * Floob Application contains the base functionality of the app.
 */
var FloobApp = {
    // Logger, used to forward output from plugins.
    logger: ConsoleLogger,

    /**
     * Processes the given input options.
     * @param {object} options Options which define what to run.
     */
    process: function(options) {
        // Validate options
        const { url } = options;
        const self = this;

        AppLogger.info('FloobApp', 'Start processing with options:', options);

        PluginManager.setup(options, () => {
            AppLogger.info('PluginManager', 'Initialized PluginManager');

            const queue = PageQueue.create({ url, processResult: (data) => {
                AppLogger.info('PageQueue', `Fetched data from url ${url}`);
                PluginManager.process(data, self.logger);
            }});

            queue.start();
        });
    }
};

export default FloobApp;
