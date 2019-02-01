const express = require('express');
const router = express.Router();
const user = require('../../controllers').UserController;
const tokenMiddleware = require('../../middleware/token.middleware');

router
  .get('/githubLogin', user.githubLogin) // github登录
  .get('/callback', user.callback) // github登录回调
  .post('/register', user.register) // 注册
  .post('/checkAccount', user.checkAccount) // 检查是否有重复的account
  .post('/login', user.login) // 系统内登陆
  .post('/logout', user.logout) // 退出登录
  .use('/', tokenMiddleware)
  .post('/checkAuth', user.checkAuth) // 检查权限
  .get('/getUserList', user.getUserList) // 获取用户列表

module.exports = router