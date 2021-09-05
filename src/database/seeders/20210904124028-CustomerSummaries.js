'use strict';

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      "CustomerSummaries", [
        {
        customerID:1,
        seasonID:1,
        totalRepaid:80,
        totalCredit:100,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        customerID:1,
        seasonID:2,
        totalRepaid:30,
        totalCredit:120,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        customerID:2,
        seasonID:1,
        totalRepaid:80,
        totalCredit:100,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        customerID:2,
        seasonID:2,
        totalRepaid:30,
        totalCredit:120,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        customerID:3,
        seasonID:1,
        totalRepaid:100,
        totalCredit:100,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        customerID:3,
        seasonID:2,
        totalRepaid:120,
        totalCredit:120,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
     
      ], {}
    ),
  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete("CustomerSummaries", null, {}),
};
