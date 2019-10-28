const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')
const CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin

const license = fs.readFileSync('LICENSE', 'utf8')

const isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  mode: isProduction ? 'production' : 'development',
  entry: './src/index.ts',
  output: {
    filename: isProduction ? 'hlviewer.min.js' : 'hlviewer.js',
    path: path.resolve(__dirname, './dist'),
    library: 'HLViewer',
    libraryTarget: 'umd'
  },
  devtool: isProduction ? 'source-map' : 'none',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        include: [path.resolve(__dirname, './src')],
        use: { loader: 'awesome-typescript-loader' }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.jsx'],
    alias: {
      react: 'preact/compat',
      'react-dom/test-utils': 'preact/test-utils',
      'react-dom': 'preact/compat'
    }
  },
  plugins: [
    new CheckerPlugin(),
    new webpack.BannerPlugin({
      banner: license
    }),
    new webpack.DefinePlugin({
      VERSION: JSON.stringify(require('./package.json').version)
    })
  ],
  node: {
    fs: 'empty'
  },
  optimization: isProduction
    ? {
        minimize: true,
        minimizer: [new TerserPlugin()]
      }
    : undefined
}
