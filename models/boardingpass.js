"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class BoardingPass extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      BoardingPass.belongsTo(models.passenger);
      BoardingPass.belongsTo(models.ticket);
      BoardingPass.belongsTo(models.flight);
      BoardingPass.belongsTo(models.Baggage,{foreignKey:'baggageId'});
    }
  }
  BoardingPass.init(
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
      flightId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      ticketId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      baggageId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      hasCheckin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      gate: {
        type: DataTypes.STRING,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "boardingPass",
      tableName: "boardingPasses",
    }
  );
  return BoardingPass;
};
