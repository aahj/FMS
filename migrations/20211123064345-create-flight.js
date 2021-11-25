"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("flights", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      airlineId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "airlines",
          key: "id",
        },
      },
      departDate: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      arrivalDate: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      departTime: {
        type: Sequelize.TIME,
        allowNull: false,
      },
      arrivalTime: {
        type: Sequelize.TIME,
        allowNull: false,
      },
      from: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      to: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      totalSeats: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable("flights");
  },
};
