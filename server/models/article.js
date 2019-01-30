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
    },
    // 浏览量
    pageView: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
      field: 'page_view'
    }
  }, {
    paranoid: true,
    underscored: true,
    // 定义表名
    tableName: `${tablePrefix}article`
  });
  Article.associate = (models) => {
    models.article.belongsToMany(models.tag, {
      as: 'tags',
      through: 't_article_to_tag',
      foreignKey: 'article_id',
      targetKey: 'articleId'
    });
  };
  return Article;
};