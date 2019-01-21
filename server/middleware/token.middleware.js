const tokenUtils = require('../utils/token.utils');
const resUtils = require('../utils/response.utils');
const log = require('../utils/log.utils');

module.exports = (req, res, next) => {
  const token = req.cookies.token;
  tokenUtils.decodeToken(token).then((decoded) => {
    req.tokenInfo = decoded
    next();
  }).catch(error => {
    if (!error) {
      return res.json(resUtils.dealLackToken('缺少token'));
    }
    if (error.name == 'TokenExpiredError') {
      return res.json(resUtils.dealTokenExpire('TOKEN过期'));
    } else if (error.name == 'JsonWebTokenError') {
      return res.json(resUtils.dealTokenInvalid('TOKEN无效'));
    } else {
      log.error(error)
      return res.json(resUtils.dealTokenErr('服务器出现错误,请联系开发人员处理'));
    }
  })
}