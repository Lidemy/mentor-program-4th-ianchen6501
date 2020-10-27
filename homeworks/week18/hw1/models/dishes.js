'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class dishes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  dishes.init({
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    price: DataTypes.INTEGER,
    photo_url: DataTypes.STRING,
    is_deleted: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'dishes',
  });
  return dishes;
};