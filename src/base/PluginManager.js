import fs from 'fs';
import async from 'async';
import metaPlugin from '../plugin/html-meta-analyser/plugin';

var PluginManager = {

    pluginDirectory: './src/plugin',

    plugins: [],

    setup: function(options, done)  {
        // TODO: pluginDirectoy as optional option?
        this.load(this.pluginDirectory, done);
    },

    // TODO change to promise return?
    load: function(directory, done) {
        const self = this;

        self.plugins.push(metaPlugin);
        done();

        //Dynamic loading doesn't work
        /*fs.readdir(this.pluginDirectory, (err, list) => {
            if (err) {
                // TODO: error handling
                console.log(err);
                return
            }

            var pluginsToLoad = [];

            list.forEach((file) => {
                var path = `../src/plugin/${file}/plugin.js`;
                self.plugins.push(require(path));
            });

            done();
        });*/
    },

    process: function(data, logger) {
        this.plugins.forEach((plugin) => {
            plugin.process(data, logger);
        });
    }
};

export default PluginManager;