const tablePrefix = require('../config').databaseConfig.table.prefix;

module.exports = (sequelize, DataTypes) => {
  const Article = sequelize.define('article', {
    articleId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      field: 'id'
    },
    // 文章标题
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // 文章内容
    content: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    // 文章状态
    status: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false
    }
  }, {
    paranoid: true,
    underscored: true,
    // 定义表名
    tableName: `${tablePrefix}article`
  });
  return Article;
};