const UserDAO = require('../daos').UserDAO;

const UserService = {
  /**
   * @description 查找或者新增user
   * @param {Object} user
   * @returns {Promise} - Sequelize 数据库操作的结果
   */
  findOrAddUser (user) {
    return UserDAO.findOrCreateUser(user)
  },

  /**
   * @description 检查account是否已存在
   * @param {String} 账号
   * @returns {Promise} - Sequelize 数据库操作的结果
   */
  checkAccount (account) {
    return UserDAO.checkAccount(account)
  },

  /**
   * @description 登录
   * @param {String} 账号
   * @param {String} 密码
   * @returns {Promise} - Sequelize 数据库操作的结果
   */
  login (account, password) {
    return UserDAO.findUserByAccAndPwd(account, password)
  },

  /**
   * @description 登录
   * @param {Number} 用户id
   * @returns {Promise} - Sequelize 数据库操作的结果
   */
  checkAuth (userId) {
    return UserDAO.queryUserById(userId).then(user => {
      return Promise.resolve(user.priv === 1 ? true : false)
    })
  },

  /**
   * @description 获取人员列表
   * @param {Number} 页大小
   * @param {Number} 页码
   * @returns {Promise} - Sequelize 数据库操作的结果
   */
  getUserList (pageSize, pageNo) {
    return UserDAO.queryUserList(pageSize, pageNo)
  },

  /**
   * @description 设置权限
   * @param {Object} 参数
   * @returns {Promise} - Sequelize 数据库操作的结果
   */
  updatePriv (params) {
    return UserDAO.updatePriv(params)
  }
}

module.exports = UserService