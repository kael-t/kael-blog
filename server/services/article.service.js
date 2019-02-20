const ArticleDAO = require('../daos').ArticleDAO

const ArticleService = {
  getArticleDetail (articleId) {
    return ArticleDAO.queryArticleById(articleId)
  },
  /**
   * @description 若参数不含articleId,则直接创建一条新纪录,否则查找对应的文章并更新
   * @param {Number}  pageSize - 页大小
   * @param {String} pageNo - 页码
   * @returns {Promise} - Sequelize 数据库操作的结果
   */
  getArticleList (pageSize, pageNo) {
    return ArticleDAO.queryArticleList(pageSize, pageNo)
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
  saveArticle (params) {
    if (params.articleId) {
      return ArticleDAO.findOrCreateArticle(params)
    } else {
      return ArticleDAO.createArticle(params)
    }
  },
}

module.exports = ArticleService