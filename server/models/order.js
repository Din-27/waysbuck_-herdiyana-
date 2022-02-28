'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      order.belongsTo(models.user, {
        as: "user",
        foreignKey: {
          name: "idUser",
        },
      });
      order.belongsTo(models.product, {
        as: "product",
        foreignKey: {
          name: "idProduct",
        },
      });
      order.belongsTo(models.toping, {
        as: "toping",
        foreignKey: {
          name: "idToping",
        },
      });
      order.hasMany(models.transaction, {
        as: "transaction",
        foreignKey: {
          name: "idOrder",
        },
      });
    }
  }
  order.init({
    qty: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'order',
  });
  return order;
};