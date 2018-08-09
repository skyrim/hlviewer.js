var fs = require('fs')
var webpack = require('webpack')
var path = require('path')
var CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin
var nodeExternals = require('webpack-node-externals')
var license = fs.readFileSync('LICENSE', 'utf8')

module.exports = {
  mode: 'development',
  entry: {
    wadexporter: './tools/WadExporter/index.ts'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './dist')
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.ts?$/,
        include: [
          path.resolve(__dirname, './src'),
          path.resolve(__dirname, './tools')
        ],
        exclude: [],
        use: [
          {
            loader: 'awesome-typescript-loader',
            options: {
              configFileName: 'tsconfig.tools.json'
            }
          }
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
  target: 'node',
  externals: [nodeExternals()],
  node: {
    __dirname: false
  } 
}
