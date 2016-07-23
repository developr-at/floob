var MetaAnalyserPlugin = require('./lib/plugin/html-meta-analyser/plugin').default;

module.exports = {
    plugins: [
        { plugin: MetaAnalyserPlugin },
    ]
};