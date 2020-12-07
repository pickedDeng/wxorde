'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Order.init({
    submitId: DataTypes.INTEGER,
    submitPeople: DataTypes.STRING,
    orderType: DataTypes.STRING,
    customerName: DataTypes.STRING,
    finishTime: DataTypes.STRING,
    handleState: DataTypes.INTEGER,
    needText: DataTypes.STRING,
    currentHandleId: DataTypes.INTEGER,
    needSource: DataTypes.STRING,
    status: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};