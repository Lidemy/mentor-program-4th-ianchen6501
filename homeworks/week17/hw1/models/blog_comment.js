'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class blog_comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      blog_comment.belongsTo(models.blog_user)
    }
  };
  blog_comment.init({
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    is_deleted: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'blog_comment',
  });
  return blog_comment;
};