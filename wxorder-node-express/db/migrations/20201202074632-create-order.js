'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      submitId: {
        type: Sequelize.INTEGER
      },
      submitPeople: {
        type: Sequelize.STRING
      },
      orderType: {
        type: Sequelize.STRING
      },
      customerName: {
        type: Sequelize.STRING
      },
      finishTime: {
        type: Sequelize.STRING
      },
      handleState: {
        type: Sequelize.INTEGER
      },
      needText: {
        type: Sequelize.STRING
      },
      currentHandleId: {
        type: Sequelize.INTEGER
      },
      needSource: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Orders');
  }
};