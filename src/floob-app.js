import PageQueue from './page/queue';
import PluginManager from './base/plugin-manager';
import ConsoleLogger from './logger/console-logger';
import AppLogger from './logger/app-logger';
import metaAnalyserPlugin from './plugin/html-meta-analyser/plugin';
import statisticsPlugin from './plugin/html-statistics/plugin';

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
        PluginManager.registerPlugin(metaAnalyserPlugin);
        PluginManager.registerPlugin(statisticsPlugin);
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

        PluginManager.setup(options, () => {
            AppLogger.info('PluginManager', 'Initialized PluginManager');

            const queue = PageQueue.create({ url, processResult: (data) => {
                PluginManager.process(data, self.logger);
            }});

            queue.start();
        });
    }
};

export default FloobApp;
