let db = require("../models/index");

exports.createAirline = async (req, res) => {
  const sequelize = db.sequelize;

  const transaction = await sequelize.transaction();
  try {
    const Airline = db.airline;
    const body = req.body;

    const airline = await Airline.findOne({
      where: { name: body.name },
    });
    if (!airline) {
      const data = await Airline.create(
        {
          name: body.name,
          phone: body.phone,
          address: body.address,
        },
        { transaction }
      );

      res.status(200).json({
        success: true,
        message: "Airline created",
        data,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Airline exist already",
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
exports.fetchAllAirline = async (req, res) => {
  const Airline = db.airline;

  const airline = await Airline.findAll({
    include: { all: true, attributes: { exclude: ["createdAt", "updatedAt"] } },
    attributes: { exclude: ["createdAt", "updatedAt"] },
  });
  if (airline.length == 0) {
    return res.status(404).json({
      success: false,
      message: "Airline not found",
    });
  }
  res.status(200).json({
    success: true,
    length: airline.length,
    message: "Airline fetched successfully",
    data: airline,
  });
};
exports.fetchAirlineById = async (req, res) => {
  const Airline = db.airline;
  const id = req.params.id;

  const airline = await Airline.findOne({
    where: { id: id },
    attributes: { exclude: ["createdAt", "updatedAt"] },
    include: { all: true, attributes: { exclude: ["createdAt", "updatedAt"] } },
  });
  if (!airline) {
    return res.status(404).json({
      success: false,
      message: "Airline not found",
    });
  }
  res.status(200).json({
    success: true,
    message: "Airline fetched successfully",
    data: airline,
  });
};
exports.updateAirline = async (req, res) => {
  const sequelize = db.sequelize;
  const transaction = await sequelize.transaction();

  try {
    const Airline = db.airline;
    const body = req.body;
    const id = req.params.id;

    const newData = {
      name: body.name,
      phone: body.phone,
      address: body.address,
    };

    const airline = await Airline.update(newData, {
      where: { id: id },
    });
    if (airline[0] === 1) {
      return res.status(200).json({
        success: true,
        message: "Airline updated",
      });
    }
    if (airline[0] === 0) {
      return res.status(400).json({
        success: false,
        message: "Airline not found",
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
