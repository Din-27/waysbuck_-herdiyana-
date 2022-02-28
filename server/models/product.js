'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      product.hasMany(models.order, {
        as: "order",
        foreignKey: {
          name: "idProduct",
        },
      });
      product.hasMany(models.transaction, {
        as: "transaction",
        foreignKey: {
          name: "idProduct",
        },
      });
    }
  }
  product.init({
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'product',
  });
  return product;
};