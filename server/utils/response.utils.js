
// 错误码定义
const SUCCESS = 0;                    // 成功
const FAIL = 1;                       // 失败
const PARAMS_NOT_COMPLETE = 1001;     // 参数不全

const TOKEN_INVALID = 2001;           // token无效
const TOKEN_EXPIRE = 2002;            // token过期
const TOKEN_ERROR = 2003;             // token验证时抛出错误
const TOKEN_LACK = 2004;              // 缺少token

const utils = {
  // 接口成功处理
  dealSuccess (obj = {}, msg = 'success') {
    const status = {
      code: SUCCESS,
      msg: msg
    }
    return Object.assign(status, obj);
  },

  // 接口返回失败
  dealFail (obj, msg) {
    const status = {
      code: FAIL,
      msg: msg || 'fail'
    }
    return Object.assign(status, obj);
  },

  // 接口缺少参数
  dealLackParam (param) {
    return {
      code: PARAMS_NOT_COMPLETE,
      msg: '缺少参数 ' + param + '，请补充'
    };
  },

  // token失效
  dealTokenInvalid (msg) {
    return {
      code: TOKEN_INVALID,
      msg: msg
    }
  },

  // token过期
  dealTokenExpire (msg) {
    return {
      code: TOKEN_EXPIRE,
      msg: msg
    }
  },

  // token验证时抛出错误
  dealTokenErr (msg) {
    return {
      code: TOKEN_ERROR,
      msg: msg
    }
  },

  // 缺少token
  dealLackToken (msg) {
    return {
      code: TOKEN_LACK,
      msg: msg
    }
  }
}

module.exports = utils;