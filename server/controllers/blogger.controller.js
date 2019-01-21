const BloggerService = require('../services').BloggerService;
const resUtils = require('../utils/response.utils');

const BloggerContoller = {
  // 获取博主信息
  getbloggerInfo (req, res, next) {
    BloggerService.getBloggerInfo().then((info) => {
      return res.json(resUtils.dealSuccess({ bloggerInfo: info }, '查询博主信息成功'))
    })
  },
  // 设置博主信息
  updateBloggerInfo (req, res, next) {
    let data = req.body
    BloggerService.updateBloggerInfo(data).then(() => {
      return res.json(resUtils.dealSuccess(null, '设置博主信息成功'))
    })
  }
}

module.exports = BloggerContoller