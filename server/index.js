
const express = require('express')
const consola = require('consola')
const globalConfig = require('./config').globalConfig
const { Nuxt, Builder } = require('nuxt')
const app = express()
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const route = require('./routes')
const log = require('./utils/log.utils');

const host = process.env.HOST || globalConfig.host
const port = process.env.PORT || globalConfig.port

app.set('port', port)

app.use(cookieParser())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());

app.all('*', async (req, res, next) => {
  // 响应开始时间
  const start = new Date();
  // 进入下一中间件
  await next();
  // 记录间隔时间
  const duration = new Date() - start;
  // 写入请求日志
  log.reqLog(req, duration);
});

// set routes
app.use('/', route)

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
start()
