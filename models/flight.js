"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Flight extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Flight.belongsTo(models.airline)
    }
  }
  Flight.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },

      airlineId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      departDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      arrivalDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      departTime: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      arrivalTime: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      from: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      to: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      totalSeats: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "flight",
      tableName: "flights",
    }
  );
  return Flight;
};
