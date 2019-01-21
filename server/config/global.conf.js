const config = {
  // 开发环境
  development: {
    domain: 'http://localhost:3000',
    host: '127.0.0.1',
    port: 3000
  },
  // 生产环境
  production: {
    domain: 'http://localhost:3000',
    host: '127.0.0.1',
    port: 3000
  }
}

module.exports = config[process.env.NODE_ENV]