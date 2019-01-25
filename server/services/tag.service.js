const TagDAO = require('../daos').TagDAO

const TagService = {
  /**
   * @description 获取标签列表
   * @returns {Promise} - Sequelize 数据库操作的结果
   */
  getTagList () {
    return TagDAO.queryTagList()
  },

  /**
   * @description 获取标签列表
   * @param {String} 标签名
   * @returns {Promise} - Sequelize 数据库操作的结果
   */
  createTag (label) {
    return TagDAO.createTag(label)
  },

  /**
   * @description 设置博主信息
   * @param {Number} 标签id
   * @param {String} 标签名
   * @returns {Promise} - Sequelize 数据库操作的结果
   */
  updateTag (tagId, label) {
    return TagDAO.updateTag(tagId, label)
  },

  /**
   * @description 设置博主信息
   * @param {Array} 标签ids
   * @returns {Promise} - Sequelize 数据库操作的结果
   */
  deleteTag (tagIds) {
    return TagDAO.deleteTag(tagIds)
  }
}

module.exports = TagService