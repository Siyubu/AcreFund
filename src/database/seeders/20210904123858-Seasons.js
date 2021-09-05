'use strict';
module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      "Seasons", [{
        name: "Icyi_2020",
        startDate: new Date("2020,6,25"),
        endDate:new Date("2020,8,25"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Umuhindo_2020",
        startDate: new Date("2020,3,25"),
        endDate:new Date("2020,5,25"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      ], {}
    ),
  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete("Seasons", null, {}),
};
