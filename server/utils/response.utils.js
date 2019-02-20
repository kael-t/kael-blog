
// 错误码定义
const SUCCESS = 0;                    // 成功
const FAIL = 1;                       // 失败
const PARAMS_NOT_COMPLETE = 1001;     // 参数不全

const TOKEN_INVALID = 2001;           // token无效
const TOKEN_EXPIRE = 2002;            // token过期
const TOKEN_ERROR = 2003;             // token验证时抛出错误
const TOKEN_LACK = 2004;              // 缺少token

const PERMISSION_NO_ACCESS = 50001;     // 没有访问权限

const utils = {
  /**
   * @description 接口请求成功
   * @param {Object} obj 结果对象
   * @param {String} msg 结果消息
   * @returns
   */
  dealSuccess (obj = null, msg = 'success') {
    const status = {
      code: SUCCESS,
      msg: msg
    }
    return Object.assign(status, obj);
  },

  /**
   * @description 接口请求失败
   * @param {Object} obj 错误对象
   * @param {String} msg 错误消息
   * @returns
   */
  dealFail (obj = null, msg = 'fail') {
    const status = {
      code: FAIL,
      msg: msg
    }
    return Object.assign(status, obj);
  },

  /**
   * @description 缺少接口参数
   * @param {String} param 缺少的参数名
   * @returns
   */
  dealLackParam (param) {
    return {
      code: PARAMS_NOT_COMPLETE,
      msg: '缺少参数 ' + param + '，请补充'
    };
  },

  /**
   * @description token失效
   * @param {String} msg消息
   * @returns
   */
  dealTokenInvalid (msg = '登录状态失效，请重新登录') {
    return {
      code: TOKEN_INVALID,
      msg: msg
    }
  },

  /**
   * @description token过去
   * @param {String} msg消息
   * @returns
   */
  dealTokenExpire (msg = '登录状态已过期，请重新登录') {
    return {
      code: TOKEN_EXPIRE,
      msg: msg
    }
  },

  /**
   * @description token验证时抛出错误
   * @param {String} msg消息
   * @returns
   */
  dealTokenErr (msg = '登录态验证有误，请重新登录') {
    return {
      code: TOKEN_ERROR,
      msg: msg
    }
  },

  /**
   * @description 缺少token
   * @param {String} msg消息
   * @returns
   */
  dealLackToken (msg = '没有检测到登录状态，请重新登陆') {
    return {
      code: TOKEN_LACK,
      msg: msg
    }
  },
  /**
   * @description 没有访问权限
   * @param {String} msg消息
   * @returns
   */
  dealNoAccessPermission (msg = '抱歉，您没有访问权限。如有问题请联系系统管理员') {
    return {
      code: PERMISSION_NO_ACCESS,
      msg: msg
    }
  },

  /**
   * @description 检查必须的参数
   * @param {Object} 参数表
   * @param {Array<String>} 必填的参数的key值
   * @returns
   */
  checkLackParams (params = {}, arr = []) {
    if (arr.length === 0) return
    for (let i in arr) {
      if (params[arr[i]] === null || params[arr[i]] === undefined) {
        return this.dealLackParam(arr[i])
      }
    }
  },
}

module.exports = utils;