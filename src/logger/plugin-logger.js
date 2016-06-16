
const PluginLogger = {

    logger: null,

    pluginName: null,

    /**
     * Write verbose information to the log.
     */
    verbose: function(...args) {
        if (this.logger) {
            this.logger.verbose(this.pluginName, ...args);
        }
    },

    /**
     * Write information to the log.
     */
    info: function(...args) {
        if (this.logger) {
            this.logger.info(this.pluginName, ...args);
        }
    },


    /**
     * Write a warning to the log.
     */
    warn: function(...args) {
        if (this.logger) {
            this.logger.warn(this.pluginName, ...args);
        }
    },

    /**
     * Write an error to the log.
     */
    error: function(...args) {
        if (this.logger) {
            this.logger.error(this.pluginName, ...args);
        }
    }
};

export default PluginLogger;