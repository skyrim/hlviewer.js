var fs = require('fs')
var webpack = require('webpack')
var path = require('path')
var CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin
var license = fs.readFileSync('LICENSE', 'utf8')

module.exports = {
  mode: 'development',
  entry: {
    hlviewer: './src/index.ts'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './dist')
  },
  devtool: 'eval',
  module: {
    rules: [
      {
        test: /\.glsl$/,
        include: [path.resolve(__dirname, './src')],
        use: { loader: 'raw-loader' }
      },
      {
        test: /\.tsx?$/,
        include: [path.resolve(__dirname, './src')],
        use: { loader: 'awesome-typescript-loader' }
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader', // creates style nodes from JS strings
          {
            loader: 'css-loader', // translates CSS into CommonJS
            options: {
              url: false
            }
          },
          'sass-loader' // compiles Sass to CSS
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.jsx']
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
  }
}
