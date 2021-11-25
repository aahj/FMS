"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Baggage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Baggage.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      passengerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        
      },
      weight: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Baggage",
      tableName:'baggage'
    }
  );
  return Baggage;
};
