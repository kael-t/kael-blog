const ArticleModel = require('../models').article
const TagModel = require('../models').tag
const sequelize = require('../models').sequelize

const ArticleDAO = {
  queryArticleById (articleId) {
    return ArticleModel.findByPk(articleId, {
      attributes: {
        exclude: sequelize.exclude
      },
      include: [
        {
          model: TagModel,
          as: 'tags',
          attributes: {
            exclude: sequelize.exclude
          },
          through: {
            attributes: []
          }
        }
      ]
    })
  },
  /**
   * @description 获取文章列表
   * @param {Number} 页大小
   * @param {Number} 页码
   * @returns {Promise} - Sequelize 数据库操作的结果
   */
  queryArticleList (pageSize, pageNo) {
    return ArticleModel.findAndCountAll({
      offset: pageSize * (pageNo - 1),
      limit: pageSize,
      attributes: ['articleId', 'title', 'content', 'status', 'pageView']
    })
  },
  /**
   * 新增文章
   */
  createArticle (articleInfo) {
    return sequelize.transaction(t => {
      return ArticleModel.create(articleInfo, {
        transaction: t
      }).then(article => {
        return TagModel.findAll({
          where: {
            tagId: {
              $in: articleInfo.tagIds
            }
          }
        }).then(tags => {
          return article.addTags(tags, {
            transaction: t
          })
        })
      })
    })
  },
  /**
   * @description 若参数不含articleId,则直接创建一条新纪录,否则查找对应的文章并更新
   * @argument {Object} 文章信息
   * @param {Number}  articleId - 文章id
   * @param {String} content - 内容
   * @param {String} title - 标题 
   * @param {Array} tagIds - 标签ids
   * @returns {Promise} - Sequelize 数据库操作的结果
   */
  findOrCreateArticle ({ articleId, content, title }) {
    return ArticleModel.upsert({
      articleId,
      content,
      title
    })
  },
}

module.exports = ArticleDAO