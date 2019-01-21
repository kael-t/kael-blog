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
   * @param {Object} 博主信息 -name 姓名 -motto 格言 -qq qq号码 
   *                         -weibo 微博url -github githubUrl -aboutMe 关于我
   * @returns {Promise} - Sequelize 数据库操作的结果
   */
  updateBloggerInfo (bloggerInfo) {
    return BloggerDAO.updateInfo(bloggerInfo)
  }
}

module.exports = BloggerService