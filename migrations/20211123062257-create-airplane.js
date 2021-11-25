"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable(
        "airplanes",
        {
          id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
          },
          modelNumber: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          totalSeats: {
            type: Sequelize.INTEGER,
            allowNull: false,
          },
          manufacturer: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          airlineId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
              model: "airlines",
              key: "id",
            },
          },
          createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
          },
          updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
          },
        },
        { transaction }
      );
      await transaction.commit();
    } catch (error) {
      console.log(error);
      await transaction.rollback();
      throw error;
    }
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("airplanes");
  },
};
