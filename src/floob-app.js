import PageQueue from './page/queue';
import PluginManager from './base/PluginManager';
import ConsoleLogger from './logger/ConsoleLogger';

var FloobApp = {
    logger: ConsoleLogger,

    process: function(options) {
        // Validate options
        const { url } = options;
        const self = this;

        PluginManager.setup(options, () => {
            self.logger.log("Initialized PluginManager");

            const queue = PageQueue.create({ url, processResult: (data) => {
                self.logger.log(`Fetched data from url ${url}`);
                PluginManager.process(data, self.logger);
            }});

            queue.start();
        });
    }
};

export default FloobApp;
