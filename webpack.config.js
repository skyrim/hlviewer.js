var fs = require('fs')
var webpack = require('webpack')

var license = fs.readFileSync('LICENSE', 'utf8')

module.exports = {
    entry: {
        'hlviewer':     './src/index.js',
        'hlviewer.min': './src/index.js'
    },
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
        }, {
            test: /\.json$/,
            exclude: /node_modules/,
            loader: 'json-loader'
        }]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            include: /\.min\.js$/,
            minimize: true
        }),
        new webpack.BannerPlugin(license)
    ],
    node: {
        fs: 'empty'
    }
};