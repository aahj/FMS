let db = require("../models/index");

exports.createAirplane = async (req, res) => {
  const sequelize = db.sequelize;

  const transaction = await sequelize.transaction();
  try {
    const Airplane = db.airplane;
    const body = req.body;

    const airplane = await Airplane.findOne({
      where: { modelNumber: body.modelNumber },
    });
    if (!airplane) {
      const data = await Airplane.create(
        {
          modelNumber: body.modelNumber,
          totalSeats: body.totalSeats,
          manufacturer: body.manufacturer,
          airlineId: body.airlineId,
        },
        { transaction }
      );

      res.status(200).json({
        success: true,
        message: "Airplane created",
        data,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Airplane exist already",
      });
    }
    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
exports.fetchAllAirplane = async (req, res) => {
  const Airplane = db.airplane;

  const airplane = await Airplane.findAll({
    attributes: { exclude: ["createdAt", "updatedAt"] },
    include: { all: true, attributes: { exclude: ["createdAt", "updatedAt"] } },
  });
  if (airplane.length == 0) {
    return res.status(404).json({
      success: false,
      message: "Airplane not found",
    });
  }
  return res.status(200).json({
    success: true,
    length: airplane.length,
    message: "Airplane fetched successfully",
    data: airplane,
  });
};
exports.fetchAirplaneById = async (req, res) => {
  const Airplane = db.airplane;
  const id = req.params.id;

  const airplane = await Airplane.findOne({
    where: { id: id },
    include: { all: true, attributes: { exclude: ["createdAt", "updatedAt"] } },
    attributes: { exclude: ["createdAt", "updatedAt"] },
  });
  if (!airplane) {
    return res.status(404).json({
      success: false,
      message: "Airplane not found",
    });
  }
  return res.status(200).json({
    success: true,
    message: "Airplane fetched successfully",
    data: airplane,
  });
};
exports.updateAirplane = async (req, res) => {
  const sequelize = db.sequelize;
  const transaction = await sequelize.transaction();

  try {
    const Airplane = db.airplane;
    const body = req.body;
    const id = req.params.id;

    const newData = {
      modelNumber: body.modelNumber,
      totalSeats: body.totalSeats,
      manufacturer: body.manufacturer,
      airlineId: body.airlineId,
    };

    const airplane = await Airplane.update(newData, {
      where: { id: id },
    });
    if (airplane[0] === 1) {
      return res.status(200).json({
        success: true,
        message: "Airplane updated",
      });
    }
    if (airplane[0] === 0) {
      return res.status(400).json({
        success: false,
        message: "Airplane not found",
      });
    }
    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
