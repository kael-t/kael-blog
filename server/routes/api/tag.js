const express = require('express');
const router = express.Router();
const tag = require('../../controllers').TagController;

router
  .get('/getTagList', tag.getTagList) // 获取标签列表
  .post('/createTag', tag.createTag) // 新建标签
  .post('/updateTag', tag.updateTag) // 更新标签
  .get('/deleteTag', tag.deleteTag) // 删除标签

module.exports = router;