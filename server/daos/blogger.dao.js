const BloggerModel = require('../models').blogger

const BloggerDAO = {
  /**
   * 查询博主信息
   * @returns {Object} blogger 博主信息
   */
  queryInfo () {
    return BloggerModel.findOne({where: { id: 1 }})
  },

  /**
   * 更新博主数据
   * @param {Object} bloggerInfo
   * @returns
   */
  updateInfo (bloggerInfo) {
    return BloggerModel.update(bloggerInfo, {
      where: { id: 1 }
    })
  }
}

module.exports = BloggerDAO