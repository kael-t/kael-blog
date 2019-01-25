const tablePrefix = require('../config').databaseConfig.table.prefix;

module.exports = (sequelize, DataTypes) => {
  // 标签实体模型
  const Tag = sequelize.define('tag', {
    tagId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      field: 'id'
    },
    // 标签名
    label: {
      type: DataTypes.STRING,
      unique: true,
      field: 'tag_label'
    }
  }, {
    paranoid: true,
    underscored: true,
    // 定义表名
    tableName: `${tablePrefix}tag`
  });
  Tag.associate = (models) => {
    models.tag.belongsToMany(models.article, {
      as: 'articles',
      through: 't_article_to_tag',
      foreignKey: 'tag_id',
      targetKey: 'tagId'
    });
  };
  return Tag;
};