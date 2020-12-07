'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class HandleHistory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  HandleHistory.init({
    orderId: DataTypes.INTEGER,
    sendPeople: DataTypes.STRING,
    besendPeople: DataTypes.STRING,
    sendType: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'HandleHistory',
  });
  return HandleHistory;
};