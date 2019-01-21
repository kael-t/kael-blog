// log4js配置
const config = {
  // 记录器
  category: 'keal-blog',
  file: {
    // log文件存放位置
    path: 'server/logs/',
    // log文件名
    name: 'keal-blog'
  },
  // log文件分割格式（默认按天分割）
  pattern: 'yyyy-MM-dd'
}

module.exports = config;