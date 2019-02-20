const githubConfig = require('../config').githubConfig;
const domain = require('../config').globalConfig.domain;
const axios = require('axios');
const UserService = require('../services').UserService;
const resUtils = require('../utils/response.utils');
const encryptUtils = require('../utils/encrypt.utils');
const log = require('../utils/log.utils');
const tokenUtils = require('../utils/token.utils');

const _setCookie = (res, user, options = null) => {
  options = Object.assign({
    maxAge: 7*24*60*60*1000
  }, options)
  let clientUser = {
    userId: user.userId,
    isGithuber: user.isGithuber,
    nickname: user.nickname,
    email: user.email
  }
  res.cookie('token', tokenUtils.generateToken(user), options)
  res.cookie('user', JSON.stringify(clientUser), options)
}

const UserController = {
  // github登录
  githubLogin (req, res, next) {
    let state = req.query.state || ''
    let url = `https://github.com/login/oauth/authorize?client_id=${githubConfig.client_id}&scope=${githubConfig.scope}`
    res.redirect(302, url)
  },
  // github登录回调
  async callback (req, res, next) {
    let code = req.query.code
    let url = `https://github.com/login/oauth/access_token?client_id=${githubConfig.client_id}&client_secret=${githubConfig.client_secret}&code=${code}`
    let map = {}
  
    await axios.get(url).then((resp) => {
      const { data } = resp
      let arr = data.split('&')
      arr.forEach((item) => {
        let key = item.split('=')[0]
        let value = item.split('=')[1]
        map[key] = value
      })
    })
    if (map.access_token) {
      const { data } = await axios.get(`https://api.github.com/user?access_token=${map.access_token}`)
      let userInfo = {}
      userInfo.nickname = data.login
      userInfo.email = data.email
      userInfo.name = data.name
      userInfo.motto = data.bio
      userInfo.avatar = data.avatar_url
      userInfo.isGithuber = 1
      let { user } = await UserService.findOrAddUser(userInfo)
      user = user.get({plain: true})
      _setCookie(res, user)
    }
    return res.redirect(302, `${domain}`)
  },
  // 系统内部登陆
  login (req, res, next) {
    let params = req.body;
    let { account, password } = params;
    password = encryptUtils.md5Encrypt(password);
    UserService.login(account, password).then(user => {
      if (user) {
        _setCookie(res, user)
        return res.json(resUtils.dealSuccess(null, '登陆成功'))
      } else {
        return res.json(resUtils.dealFail(null, '登陆失败'))
      }
    }).catch(err => {
      log.error(err);
      return res.json(resUtils.dealFail(null, '服务器内部错误'))
    })
  },
  // 注册
  async register (req, res, next) {
    let params = req.body;
    let { account, password, nickname, email, name, motto, avatar } = params;
    let checkResult = resUtils.checkLackParams(params, ['account', 'password', 'nickname', 'email'])
    if (checkResult) {
      return res.json(checkResult)
    }
    let userInfo = {
      account,
      password: encryptUtils.md5Encrypt(password),
      nickname,
      email,
      name,
      motto,
      avatar,
      isGithuber: 0
    }
    let { user } = await UserService.findOrAddUser(userInfo)
    user = user.get({plain: true})
    _setCookie(res, user)
    return res.json(resUtils.dealSuccess(null, '注册成功'))
  },

  // 检查是否有重复account
  checkAccount (req, res, next) {
    let account = req.body.account;
    let checkResult = resUtils.checkLackParams(req.body, ['account'])
    if (checkResult) {
      return res.json(checkResult)
    }
    UserService.checkAccount(account).then(result => {
      if (result === 0) {
        return res.json(resUtils.dealSuccess(null, '该账号可使用'))
      } else {
        return res.json(resUtils.dealFail(null, '该账号已存在'))
      }
    }).catch(err => {
      log.error(err);
      return res.json(resUtils.dealFail(null, '服务器内部错误'))
    })
  },

  // 退出登录
  logout (req, res, next) {
    res.clearCookie('token');
    res.clearCookie('user');
    return res.json(resUtils.dealSuccess(null, '退出登录成功'));
  },

  // 检查权限
  checkAuth (req, res, next) {
    let userId = req.tokenInfo.userId;
    UserService.checkAuth(userId).then(isPassCheck => {
      if(isPassCheck) {
        return res.json(resUtils.dealSuccess({pass: isPassCheck}, '鉴权完毕'));
      } else {
        return res.status(403).send(resUtils.dealNoAccessPermission())
      }
    }).catch(err => {
      log.error(err);
      return res.json(resUtils.dealFail(null, '服务器内部错误'))
    })
  },

  // 获取用户列表
  getUserList (req, res, next) {
    let params = req.query;
    let { pageSize = 20, pageNo = 1 } = params
    pageSize = parseInt(pageSize)
    pageNo = parseInt(pageNo)
    UserService.getUserList(pageSize, pageNo).then(users => {
      return res.json(resUtils.dealSuccess(users, '获取人员列表成功'));
    }).catch(err => {
      log.error(err);
      return res.json(resUtils.dealFail(null, '获取人员列表失败'))
    })
  },

  // 设置权限
  setPriv (req, res, next) {
    let params = req.body
    let checkResult = resUtils.checkLackParams(params, ['userId', 'priv'])
    if (checkResult) {
      return res.json(checkResult)
    }
    UserService.updatePriv(params).then(() => {
      return res.json(resUtils.dealSuccess(null, '设置权限成功'));
    }).catch(err => {
      log.error(err);
      return res.json(resUtils.dealFail(null, '设置权限失败'))
    })
  }
}

module.exports = UserController