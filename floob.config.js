var MetaAnalyserPlugin = require('./lib/plugin/html-meta-analyser/plugin').default;
var HtmlStatistics = require('./lib/plugin/html-statistics/plugin').default;

module.exports = {
    plugins: [
        { plugin: MetaAnalyserPlugin }, { plugin: HtmlStatistics }
    ],
    options: {
        limit: 5
    }
};