/*
 * @Author: hejin
 */
const bodyParser = require('body-parser'); // 引入body-parser模块
const cookieParser = require('cookie-parser')
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const webpackConfig = require('../../build/webpack.client')
const config = require('../../config/index.js')
const route = require('./routes/index.js')
const { data } = require('./mock')

const compiler = webpack(webpackConfig)

const app = new WebpackDevServer(compiler, {
  hot: true,
  inline: true,
  stats: { colors: true },
  disableHostCheck: true,
  publicPath: '/',
  historyApiFallback: {
    index: '/index.html',
  },
  proxy: {},

  before(app) {
    app.use(bodyParser.json()); // 解析json数据格式
    app.use(bodyParser.urlencoded({extended: true})); // 解析form表单提交的数据application/x-www-form-urlencoded

    app.use(cookieParser())
    /**
     * root 路径路由，校验token和system
     */
    app.use('/', route)

    /**
     * 生成mock.js数据，并返回给前端对接口
     */
    app.get('/test/api', (req, res) => {
      res.json(data)
    })
  },
})
app.listen(config.port, config.host, (error) => {
  if (error) {
    console.log(error)
  }
  console.log('%s: Node server started on %s:%d ...', new Date(), config.host, config.port)
})
