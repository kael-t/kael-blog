const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const config = require('../config').databaseConfig;
const sequelize = new Sequelize(config.database, config.username, config.password, config.options);
let db = {}

fs.readdirSync(__dirname)
  .filter(file => {
    // 搜索当前文件下不为本文件的js文件
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    let model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  })

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
})

/* 开发环境下初始化数据 */
if (process.env.NODE_ENV === 'development') {
  sequelize.sync({
    // force: true
  }).then(() => {
    db.blogger.findOrCreate({
      where: { id: 1 }
    })
  }).catch();
}

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.exclude = ['created_at', 'updated_at', 'deleted_at']

module.exports = db;