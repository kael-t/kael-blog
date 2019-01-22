const config = {
  // 开发环境
  development: {
    database: 'kael-blog',        // 开发环境数据库名
    username: 'root',         // 开发环境用户名
    password: '123456',       // 开发环境密码
    table: {
      prefix: 't_'            // 开发环境表前缀
    },
    options: {
      host: '127.0.0.1',      // 开发环境数据库主机
      port: 3306,             // 开发环境数据库端口号
      dialect: 'mysql',       // 开发环境数据库方言
      pool: {                 // 开发环境数据库连接池配置
        max: 5,
        min: 0,
        idle: 30000
      },
      define: {
        timestamps: true
      },
      timezone: '+08:00'      // 开发环境数据库时区
    }
  },
  // 生产环境
  production: {
    database: 'seach',        // 生产环境数据库名
    username: 'root',         // 生产环境用户名
    password: '123456',       // 生产环境密码
    table: {
      prefix: 't_'            // 生产环境表前缀
    },
    options: {
      host: '127.0.0.1',      // 生产环境数据库主机
      port: 3306,             // 生产环境数据库端口号
      dialect: 'mysql',       // 生产环境数据库方言
      pool: {                 // 生产环境数据库连接池配置
        max: 5,
        min: 0,
        idle: 30000
      },
      define: {
        timestamps: true
      },
      timezone: '+08:00',     // 生产环境数据库时区
      logging: function (executed) {
        console.log(executed)
      }
    }
  }
}

module.exports = config[process.env.NODE_ENV]