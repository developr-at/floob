var MetaAnalyserPlugin = require('./lib/plugin/html-meta-analyser/plugin').default;
var StatisticsPlugin = require('./lib/plugin/html-statistics/plugin').default;

module.exports = {
    plugins: [
        { plugin: MetaAnalyserPlugin },
        { plugin: StatisticsPlugin },
    ]
};