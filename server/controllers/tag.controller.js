const TagService = require('../services').TagService;
const resUtils = require('../utils/response.utils');
const log = require('../utils/log.utils');

const TagContoller = {
  // 获取标签列表
  getTagList (req, res, next) {
    TagService.getTagList().then((tags) => {
      return res.json(resUtils.dealSuccess({ tagList: tags }, '查询标签列表成功'))
    }).catch(err => {
      log.error(err);
      return res.json(resUtils.dealFail(null, '查询标签列表失败'))
    })
  },
  // 新建标签
  createTag (req, res, next) {
    let label = req.body.label
    let checkResult = resUtils.checkLackParams(req.body, ['label'])
    if (checkResult) {
      return res.json(checkResult)
    }
    TagService.createTag(label).then(tag => {
      return res.json(resUtils.dealSuccess({tag: tag}, '新建标签成功'))
    }).catch(err => {
      log.error(err);
      if (err.name === 'SequelizeUniqueConstraintError') {
        return res.json(resUtils.dealFail(null, '新建标签失败，已存在同名标签'))
      }
      return res.json(resUtils.dealFail(null, '新建标签失败'))
    })
  },

  // 更新标签
  updateTag (req, res, next) {
    let { tagId, label } = req.body
    let checkResult = resUtils.checkLackParams(req.body, ['tagId', 'label'])
    if (checkResult) {
      return res.json(checkResult)
    }
    TagService.updateTag(tagId, label).then(() => {
      return res.json(resUtils.dealSuccess(null, '更新标签成功'))
    }).catch(err => {
      log.error(err);
      return res.json(resUtils.dealFail(null, '更新标签失败'))
    })
  },

  // 删除标签
  deleteTag (req, res, next) {
    let checkResult = resUtils.checkLackParams(req.query, ['tagIds'])
    if (checkResult) {
      return res.json(checkResult)
    }
    let tagIds = req.query.tagIds.split(',')
    TagService.deleteTag(tagIds).then(() => {
      return res.json(resUtils.dealSuccess(null, '删除标签成功'))
    }).catch(err => {
      log.error(err);
      return res.json(resUtils.dealFail(null, '删除标签失败'))
    })
  }
}

module.exports = TagContoller