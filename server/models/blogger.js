module.exports = (sequelize, DataTypes) => {
  const Blogger = sequelize.define('blogger', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    // 姓名
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // 头像路径
    avatar: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // qq
    qq: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // 微博
    weibo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // 关于我
    aboutMe: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'about_me'
    }
  }, {
    paranoid: true,
    underscored: true
  });
  return Blogger;
};