'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class prizes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    }
  };
  prizes.init({
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    probability: DataTypes.INTEGER,
    photo_url: DataTypes.STRING,
    img: DataTypes.BLOB,
    is_deleted: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'prizes',
  });
  return prizes;
};