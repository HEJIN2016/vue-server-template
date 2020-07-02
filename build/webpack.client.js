const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')
const path = require('path')
const HappyPack = require('happypack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const copyWebpackPlugin = require("copy-webpack-plugin")
// const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

const devMode = process.env.NET_ENV === 'development'
const postCssConfig = require('../postcss.config')
const babelConfig = require('../babel.config')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

// 开启多线程打包优化，显著提升打包速度
const os = require('os');
let cpuLength = os.cpus().length
if (cpuLength >= 2) {
  cpuLength = parseInt(cpuLength / 2)
}
const happyThreadPool = HappyPack.ThreadPool({ size: cpuLength })

module.exports = {
  mode: devMode ? 'development' : 'production',
  devtool: devMode ? 'cheap-module-eval-source-map' : false,
  entry: {
    main: path.join(__dirname, '../src/client/main'),
  },
  optimization: {
    splitChunks: {
      chunks: 'async',
      name: true,
    },
  },
  output: {
    path: path.join(__dirname, '../dist/client'),
    filename: '[name].[hash].js',
    chunkFilename: '[name].[chunkhash].js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.json', '.vue'],
    alias: {
      '@': path.join(__dirname, "../src/client"),
    },
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'cache-loader'
          },
          {
            loader: 'vue-loader',
            options: {
              compilerOptions: {
                whitespace: 'condense'
              }
            }
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: [path.resolve(__dirname, '../node_modules')],
        loader: 'happypack/loader?id=babel',
      },
      {
        test: /\.(css)$/,
        use: [
          ...(!devMode ? [{
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: false,
              esModule: true,
              sourceMap: false
            },
          }] : [{ loader: 'style-loader' }]),
          { loader: 'css-loader', options: { sourceMap: devMode, importLoaders: (
            1 + // style-loader/MiniCssExtractPlugin
            1  // postcss-loader
          ) } },
          { loader: 'postcss-loader', options: postCssConfig }
        ],
      },
      {
        test: /\.(less)$/,
        use: [
          ...(!devMode ? [{
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: false,
              esModule: true,
              sourceMap: false
            },
          }] : [{ loader: 'vue-style-loader' }]),
          { loader: 'css-loader', options: { sourceMap: devMode, importLoaders: (
            1 + // vue-style-loader/MiniCssExtractPlugin
            1 + // postcss-loader
            1
          )} },
          { loader: 'postcss-loader', options: postCssConfig },
          {
            loader: 'less-loader',
            options: {
              sourceMap: devMode,
              lessOptions: {
                javascriptEnabled: true,
              }
            }
          },
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          ...(!devMode ? [{
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: false,
              esModule: true,
              sourceMap: false
            },
          }] : [{ loader: 'vue-style-loader' }]),
          { loader: 'css-loader', options: { sourceMap: devMode, importLoaders: (
            1 + // vue-style-loader/MiniCssExtractPlugin
            1 + // postcss-loader
            1
          )} },
          { loader: 'postcss-loader', options: postCssConfig },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: devMode
            }
          },
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|ttf|eot|otf|woff|woff2)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: '[name].[hash:7].[ext]',
              esModule: false
            }
          }
        ]
      },
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    ...(devMode ? [
      new webpack.HotModuleReplacementPlugin()
    ] : [
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: '[name].[hash].css',
        chunkFilename: '[id].[hash].css',
      })
    ]),

    // copy custom static assets
    new copyWebpackPlugin({
      patterns: [{
        from: path.resolve(__dirname, '../static'),
        to: 'static'
      }]
    }),

    new HappyPack({
      //用id来标识 happypack处理那里类文件
      id: 'babel',
      //如何处理  用法和loader 的配置一样
      loaders: [
        {
          loader: 'babel-loader',
          options: babelConfig
        }
      ],
      // 共享进程池
      threadPool: happyThreadPool,
      // 允许 HappyPack 输出日志
      verbose: true
    }),

    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../src/client/index.html'),
      filename: 'index.html',
      // favicon:'./src/client/assets/favicon.ico',
      // inject: true,
      // chunksSortMode: 'manual',
      minify: (devMode ? null : {
        minifyCSS: true,
        minifyJS: true,
        minifyURLs: true,
        truecollapseBooleanAttributes: true,
        collapseInlineTagWhitespace: true,
        collapseWhitespace: true
      })
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NET_ENV: process.env.NET_ENV
          ? JSON.stringify(process.env.NET_ENV)
          : JSON.stringify('development')
      },
    }),
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('../lib/polyfill-manifest.json'),
    }),
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('../lib/vendor-manifest.json'),
    }),
    new AddAssetHtmlPlugin([
      {
        filepath: path.resolve(__dirname, '../lib/polyfill*.js'),
        includeSourcemap: devMode,
      },
      {
        filepath: path.resolve(__dirname, '../lib/vendor*.js'),
        includeSourcemap: devMode,
      }
    ])
  ]
}

