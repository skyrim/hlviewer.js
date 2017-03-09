var fs = require('fs')
var webpack = require('webpack')

var license = fs.readFileSync('LICENSE', 'utf8')

module.exports = {
    entry: {
        'hlviewer':     './src/index.ts',
        'hlviewer.min': './src/index.ts'
    },
    output: {
        path: './dist',
        filename: '[name].js'
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    module: {
        rules: [{
            test: /\.tsx?$/,
            exclude: [/node_modules/],
            use: [{
                loader: 'ts-loader'
            }]
        }, {
            test: /(\.css|\.svg)$/,
            exclude: [/node_modules/],
            use: [{
                loader: 'raw-loader'
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