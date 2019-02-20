const express = require('express');
const router = express.Router();
const article = require('../../controllers').ArticleController;

router
  .get('/getArticleDetail', article.getArticleDetail) // 获取文章详情
  .get('/getArticleList', article.getArticleList) // 获取文章列表
  .post('/saveArticle', article.saveArticle) // 保存文章

module.exports = router;