const BloggerDAO = require('../daos').BloggerDAO

const BloggerService = {
  /**
   * @description 获取博主信息
   * @returns {Promise} - Sequelize 数据库操作的结果
   */
  getBloggerInfo () {
    return BloggerDAO.queryInfo()
  },

  /**
   * @description 设置博主信息
   * @returns {Promise} - Sequelize 数据库操作的结果
   */
  setBloggerInfo (bloggerInfo) {
    return BloggerDAO.updateInfo(bloggerInfo)
  }
}

module.exports = BloggerService