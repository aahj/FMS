"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("boardingPasses", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      passengerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "passengers",
          key: "id",
        },
      },
      flightId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "flights",
          key: "id",
        },
      },
      ticketId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "tickets",
          key: "id",
        },
      },
      baggageId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "baggage",
          key: "id",
        },
      },
      hasCheckin: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      gate: {
        type: Sequelize.STRING,
        defaultValue: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("boardingPasses");
  },
};
