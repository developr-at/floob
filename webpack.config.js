var nodeExternals = require('webpack-node-externals');

module.exports = {
    // Tell webpack, that we want to compile for a node.js environment
    target: 'node',
    entry: './src/floob.js',
    externals: [nodeExternals()],
    output: {
        path: __dirname,
        filename: './dist/floob.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: [/node_modules/, /test/],
                query: {
                    presets: ['es2015']
                }
            },
            // Enable require of 'package.json' and similar
            {
                test: /\.json$/,
                loader: 'json'
            }
        ]
    },
    // Mock node.js built in functionality
    node: {
        console: true,
        fs: 'empty',
        net: 'empty',
        tls: 'empty'
    }
};
