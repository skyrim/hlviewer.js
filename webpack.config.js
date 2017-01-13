var webpack = require('webpack')

module.exports = {
    entry: {
        'hlviewer':     './src/index.js',
        'hlviewer.min': './src/index.js'
    },
    devtool: 'source-map',
    output: {
        path: './dist',
        filename: '[name].js',
        library: 'HLViewer',
        libraryTarget: 'umd'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015']
            }
        }]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            include: /\.min\.js$/,
            minimize: true
        })
    ],
    node: {
        fs: "empty"
    }
};