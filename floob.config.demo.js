var MetaAnalyserPlugin = require('./dist/plugin/html-meta-analyser/plugin').default;
var StatisticsPlugin = require('./dist/plugin/html-statistics/plugin').default;

module.exports = {
    plugins: [
        { plugin: MetaAnalyserPlugin },
        { plugin: StatisticsPlugin },
    ]
};