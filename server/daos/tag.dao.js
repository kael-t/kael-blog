const TagModel = require('../models').tag
const exclude = require('../models').exclude

const TagDAO = {
  /**
   * @description 获取标签列表
   * @returns {Promise} - Sequelize 数据库操作的结果
   */
  queryTagList () {
    return TagModel.findAll({
      attributes: {
        exclude: exclude
      }
    })
  },

  /**
   * @description 获取标签列表
   * @param {String} 标签名
   * @returns {Promise} - Sequelize 数据库操作的结果
   */
  createTag (label) {
    return TagModel.create({
      label: label
    })
  },

  /**
   * @description 设置博主信息
   * @param {Number} 标签id
   * @param {String} 标签名
   * @returns {Promise} - Sequelize 数据库操作的结果
   */
  updateTag (tagId, label) {
    return TagModel.update({
      label: label
    }, {
      where: {
        tagId: tagId
      }
    })
  },

  /**
   * @description 设置博主信息
   * @param {Array} 标签ids
   * @returns {Promise} - Sequelize 数据库操作的结果
   */
  deleteTag (tagIds) {
    return TagModel.destroy({
      where: {
        tagId: {
          $in: tagIds
        }
      }
    })
  }
}

module.exports = TagDAO