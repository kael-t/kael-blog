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
    tagName: {
      type: DataTypes.INTEGER,
      unique: true,
      field: 'tag_name'
    }
  }, {
    paranoid: true,
    underscored: true,
    // 定义表名
    tableName: `${tablePrefix}tag`
  });
  return Tag;
};