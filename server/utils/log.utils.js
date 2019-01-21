const log4js = require('log4js');
const logConfig = require('../config').logConfig;

log4js.configure({
  appenders: {
    // 控制台日志
    console: {
      type: 'console',
      category: 'console'
    },
    // 请求日志
    req: {
      // 日志类型
      type: 'dateFile',
      // 日志文件名
      filename: `${logConfig.file.path}req/${logConfig.file.name}`,
      // 日志文件名追加
      pattern: `.${logConfig.pattern}.req.log`,
      // 开启pattern
      alwaysIncludePattern: true
    },
    traceAppender: {
      // 日志类型
      type: 'dateFile',
      // 日志文件名
      filename: `${logConfig.file.path}trace/${logConfig.file.name}`,
      // 日志文件名追加
      pattern: `.${logConfig.pattern}.trace.log`,
      // 开启pattern
      alwaysIncludePattern: true
    },
    errorAppender: {
      // 日志类型
      type: 'dateFile',
      // 日志文件名
      filename: `${logConfig.file.path}err/${logConfig.file.name}`,
      // 日志文件名追加
      pattern: `.${logConfig.pattern}.err.log`,
      // 开启pattern
      alwaysIncludePattern: true
    },
    // logLevelFilter需要放在对应appender的下方
    // 信息日志
    trace: {
      type: 'logLevelFilter',
      level: 'trace',
      maxLevel: 'warn',
      appender: 'traceAppender'
    },
    // 错误日志
    error: {
      type: 'logLevelFilter',
      level: 'error',
      appender: 'errorAppender'
    },
  },
  categories: {
    default: {
      appenders: ['console', 'trace', 'error'],
      level: 'trace'
    },
    req: {
      appenders: ['console', 'req'],
      level: 'info'
    }
  }
})

const requestLog = log4js.getLogger('req');
const commonLog = log4js.getLogger('default')

// 处理输出
const _layout = (log) => {
  let str = log;

  if (typeof log === 'object') {
    str = log.toString();
  }
  return str + ''
}

// 格式化请求
const _formatRequest = (req, resTime) => {
  const ip = getClientIp(req)
  const method = req.method;
  let reqText = `
    ************* request log start *************
    request method: ${method}
    request orginalUrl: ${req.originalUrl}
    request client ip: ${ip}
    ${method === 'GET' ? 'request query: ' + JSON.stringify(req.query) : 'request body: ' + JSON.stringify(req.body)}
    response status: ${req.res.statusCode}
    response body: ${JSON.stringify(req.res.body)}
    response time: ${resTime}ms
    ************* request log end *************
  `;
  return reqText;
}

// 获取请求源ip
const getClientIp = (req) => {
  return req.headers['x-forwarded-for'] ||
  req.connection.remoteAddress ||
  req.socket.remoteAddress ||
  req.connection.socket.remoteAddress || '';
}

const logger = {
  trace (log) {
    commonLog.trace(_layout(log))
  },

  debug (log) {
    commonLog.debug(_layout(log))
  },

  info (log) {
    commonLog.info(_layout(log))
  },

  warn (log) {
    commonLog.warn(_layout(log))
  },

  error (log) {
    console.log(_layout(log))
    commonLog.error(_layout(log))
  },

  fatal (log) {
    commonLog.fatal(_layout(log))
  },

  reqLog (req, resTime) {
    if (req) {
      requestLog.info(_formatRequest(req, resTime))
    }
  }
}

module.exports = logger;