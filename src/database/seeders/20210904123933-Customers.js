'use strict';
module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      "Customers", [{
        name: "Cascade",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Override",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Overpaid",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
     
 
      ], {}
    ),
  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete("Customers", null, {}),
};