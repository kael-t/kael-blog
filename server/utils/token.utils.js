const log = require('./log.utils');
const jwt = require('jsonwebtoken');
const secret = require('../config').jwtConfig.secret;

const utils = {
  // 生成token
  generateToken (user) {
    try {
      console.log(user)
      let payload = {
        userId: user.userId,
        isGithuber: user.isGithuber,
        nickname: user.nickname,
        email: user.email
      }
      let token = jwt.sign(payload, secret,{expiresIn:'7d'});
      log.trace(`向用户id：${payload.id}，签发token成功。token：${token}`)
      return token
    } catch (error) {
      log.error(error)
      log.error('生成token失败');
      return error
    }
  },
  // 解析token
  decodeToken (token) {
    return new Promise((resolve, reject) => {
      if (token) {
        try {
          const decoded = jwt.verify(token, secret);
          resolve(decoded)
        } catch (error) {
          reject(error)
        }
      } else {
        reject()
      }
    })
  }
}

module.exports = utils;