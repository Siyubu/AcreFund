'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('CustomerSummaries', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      customerID: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      seasonID: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      totalRepaid: {
        type: Sequelize.DECIMAL 
      },
      totalCredit: {
        type: Sequelize.DECIMAL 
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
    await queryInterface.dropTable('CustomerSummaries');
  }
};