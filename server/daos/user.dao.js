const Model = require('../models').sequelize;
const UserModel = Model.model('user');

const UserDAO = {
  findOrCreateUser (user) {
    return new Promise((resolve, reject) => {
      UserModel.findOrCreate({
        where: user,
        defaults: {
          priv: 0 // 设置权限默认值为0
        }
      }).spread((user, created) => {
        resolve({
          user,
          created
        })
      })
    })
  },
  /**
   * @description 检查account是否已存在
   * @param {String} 账号
   * @returns {Promise} - Sequelize 数据库操作的结果
   */
  checkAccount (account) {
    return UserModel.count({
      where: {
        account: account
      }
    })
  },
  /**
   * @description 根据账号和密码查询用户
   * @param {String} 账号
   * @param {String} 密码
   * @returns {Promise} - Sequelize 数据库操作的结果
   */
  findUserByAccAndPwd (account, password) {
    return UserModel.findOne({
      where: {
        account,
        password
      }
    })
  },
  /**
   * @description 根据id查询用户
   * @param {Number} 用户id
   * @returns {Promise} - Sequelize 数据库操作的结果
   */
  queryUserById (userId) {
    return UserModel.findById(userId)
  },
  /**
   * @description 获取人员列表
   * @param {Number} 页大小
   * @param {Number} 页码
   * @returns {Promise} - Sequelize 数据库操作的结果
   */
  queryUserList (pageSize, pageNo) {
    return UserModel.findAndCountAll({
      offset: pageSize * (pageNo - 1),
      limit: pageSize,
      attributes: {
        exclude: ['password', 'updated_at', 'deleted_at']
      }
    })
  },
  /**
   * @description 设置权限
   * @param {Number} userId - 用户Id
   * @param {Number} priv - 权限等级
   * @returns {Promise} - Sequelize 数据库操作的结果
   */
  updatePriv ({ userId, priv }) {
    return UserModel.update({
      priv: priv
    }, {
      where: {
        userId: userId
      }
    })
  }
}

module.exports = UserDAO