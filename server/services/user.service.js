const DAO = require('../daos');

const UserService = {
  /**
   * @description 查找或者新增user
   * @param {Object} user
   * @returns {Promise} - Sequelize 数据库操作的结果
   */
  findOrAddUser (user) {
    return DAO.UserDAO.findOrCreateUser(user)
  },

  /**
   * @description 检查account是否已存在
   * @param {String} 账号
   * @returns {Promise} - Sequelize 数据库操作的结果
   */
  checkAccount (account) {
    return DAO.UserDAO.checkAccount(account)
  },

  /**
   * @description 登录
   * @param {String} 账号
   * @param {String} 密码
   * @returns {Promise} - Sequelize 数据库操作的结果
   */
  login (account, password) {
    return DAO.UserDAO.findUserByAccAndPwd(account, password)
  },

  /**
   * @description 登录
   * @param {Number} 用户id
   * @returns {Promise} - Sequelize 数据库操作的结果
   */
  checkAuth (userId) {
    return DAO.UserDAO.queryUserById(userId).then(user => {
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
    return DAO.UserDAO.queryUserList(pageSize, pageNo)
  }
}

module.exports = UserService