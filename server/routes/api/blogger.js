const express = require('express');
const router = express.Router();
const blogger = require('../../controllers').BloggerController;

router
  .get('/getBloggerInfo', blogger.getbloggerInfo) // 获取博主数据
  .post('/updateBloggerInfo', blogger.updateBloggerInfo) // 设置博主数据

module.exports = router;