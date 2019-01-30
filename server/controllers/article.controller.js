const ArticleService = require('../services').ArticleService;
const resUtils = require('../utils/response.utils');
const log = require('../utils/log.utils');

const ArticleContoller = {
  // 获取文章详情
  getArticleDetail (req, res, next) {
    let articleId = req.query.articleId
    let checkResult = resUtils.checkLackParams(req.query, ['articleId'])
    if (checkResult) {
      return res.json(checkResult)
    }
    ArticleService.getArticleDetail(articleId).then(article => {
      return res.json(resUtils.dealSuccess({data: article}, '获取文章成功'))
    }).catch(err => {
      log.error(err);
      return res.json(resUtils.dealFail(null, '获取文章失败'))
    })
  },
  // 保存文章
  saveArticle (req, res, next) {
    let params = req.body
    params.tagIds = params.tagIds && params.tagIds.split(',')
    ArticleService.saveArticle(params).then(() => {
      return res.json(resUtils.dealSuccess(null, '保存文章成功'))
    }).catch(err => {
      log.error(err);
      return res.json(resUtils.dealFail(null, '保存文章失败'))
    })
  }
}

module.exports = ArticleContoller