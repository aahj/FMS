let db = require("../models/index");

exports.createAirport = async (req, res) => {
  const sequelize = db.sequelize;

  const transaction = await sequelize.transaction();
  try {
    const Airport = db.airport;
    const body = req.body;

    const airport = await Airport.findOne({
      where: { name: body.name },
    });
    if (!airport) {
      const data = await Airport.create(
        {
          name: body.name,
          country: body.country,
          location: body.location,
        },
        { transaction }
      );

      res.status(200).json({
        success: true,
        message: "Airport created",
        data,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Airport exist already",
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
exports.fetchAllAirport = async (req, res) => {
  const Airport = db.airport;

  const airport = await Airport.findAll({
    attributes: { exclude: ["createdAt", "updatedAt"] },
  });
  if (airport.length == 0) {
    return res.status(404).json({
      success: false,
      message: "Airport not found",
    });
  }
  return res.status(200).json({
    success: true,
    length: airport.length,
    message: "Airport fetched successfully",
    data: airport,
  });
};
exports.fetchAirportById = async (req, res) => {
  const Airport = db.airport;
  const id = req.params.id;

  const airport = await Airport.findOne({
    where: { id: id },
    attributes: { exclude: ["createdAt", "updatedAt"] },
  });
  if (!airport) {
    return res.status(404).json({
      success: false,
      message: "Airport not found",
    });
  }
  return res.status(200).json({
    success: true,
    message: "Airport fetched successfully",
    data: airport,
  });
};
exports.updateAirport = async (req, res) => {
  const sequelize = db.sequelize;
  const transaction = await sequelize.transaction();

  try {
    const Airport = db.airport;
    const body = req.body;
    const id = req.params.id;

    const newData = {
      name: body.name,
      country: body.country,
      location: body.location,
    };

    const airport = await Airport.update(newData, {
      where: { id: id },
    });
    if (airport[0] === 1) {
      return res.status(200).json({
        success: true,
        message: "Airport updated",
      });
    }
    if (airport[0] === 0) {
      return res.status(400).json({
        success: false,
        message: "Airport not found",
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
