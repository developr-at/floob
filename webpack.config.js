module.exports = {
    entry: './src/floob.js',
    output: {
        path: __dirname,
        filename: './dist/floob.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015']
                }
            }
        ]
    }
};
