'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SubmitPerson extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  SubmitPerson.init({
    wechatName: DataTypes.STRING,
    phone: DataTypes.STRING,
    customerId: DataTypes.INTEGER,
    status: DataTypes.INTEGER,
    openId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'SubmitPerson',
  });
  return SubmitPerson;
};