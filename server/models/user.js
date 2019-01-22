const tablePrefix = require('../config').databaseConfig.table.prefix;

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    userId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      field: 'id'
    },
    // 账号
    account: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true
    },
    // 密码
    password: {
      type: DataTypes.STRING,
      allowNull: true
    },
    // 是否为githuber
    isGithuber: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    // 姓名
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // 昵称
    nickname: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // 头像路径
    avatar: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // 格言
    motto: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // 邮箱
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // 权限等级
    priv: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    paranoid: true,
    underscored: true,
    // 定义表名
    tableName: `${tablePrefix}user`
  });
  return User;
};