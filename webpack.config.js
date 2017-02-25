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
        rules: [{
            test: /\.js$/,
            exclude: [/node_modules/],
            use: [{
                loader: 'babel-loader',
                options: {
                    presets: ['es2015']
                }
            }]
        }]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            include: /\.min\.js$/,
            minimize: true
        }),
        new webpack.BannerPlugin({
            banner: license
        })
    ],
    node: {
        fs: 'empty'
    }
};