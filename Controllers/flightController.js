let db = require("../models/index");

exports.createFlight = async (req, res) => {
  const sequelize = db.sequelize;

  const transaction = await sequelize.transaction();
  try {
    const Flight = db.flight;
    const Airline = db.airline;

    const body = req.body;
    const airline = await Airline.findOne({ where: { id: body.airlineId } });
    if (!airline) {
      return res.status(404).json({
        success: false,
        message: "airline not found",
      });
    }
    const data = await Flight.create(
      {
        airlineId: body.airlineId,
        departDate: body.departDate,
        arrivalDate: body.arrivalDate,
        departTime: body.departTime,
        arrivalTime: body.arrivalTime,
        from: body.from,
        to: body.to,
        totalSeats: body.totalSeats,
      },
      { transaction }
    );

    res.status(200).json({
      success: true,
      message: "Flight created",
      data,
    });
    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
exports.fetchAllFlight = async (req, res) => {
  const Flight = db.flight;

  const flight = await Flight.findAll({
    attributes: { exclude: ["createdAt", "updatedAt"] },
    include: { all: true, attributes: { exclude: ["createdAt", "updatedAt"] } },
  });
  if (flight.length == 0) {
    return res.status(404).json({
      success: false,
      message: "Flight not found",
    });
  }
  res.status(200).json({
    success: true,
    length: flight.length,
    message: "Flight fetched successfully",
    data: flight,
  });
};
exports.fetchFlightById = async (req, res) => {
  const Flight = db.flight;
  const id = req.params.id;

  const flight = await Flight.findOne({
    attributes: { exclude: ["createdAt", "updatedAt"] },
    where: { id: id },
    include: { all: true, attributes: { exclude: ["createdAt", "updatedAt"] } },
  });
  if (!flight) {
    return res.status(404).json({
      success: false,
      message: "Flight not found",
    });
  }
  res.status(200).json({
    success: true,
    message: "Flight fetched successfully",
    data: flight,
  });
};
exports.updateFlight = async (req, res) => {
  const sequelize = db.sequelize;
  const transaction = await sequelize.transaction();

  try {
    const Flight = db.flight;
    const body = req.body;
    const id = req.params.id;

    const newData = {
      airlineId: body.airlineId,
      departDate: body.departDate,
      arrivalDate: body.arrivalDate,
      departTime: body.departTime,
      arrivalTime: body.arrivalTime,
      from: body.from,
      to: body.to,
      totalSeats: body.totalSeats,
    };

    const flight = await Flight.update(newData, {
      where: { id: id },
    });
    if (flight[0] === 1) {
      return res.status(200).json({
        success: true,
        message: "Flight updated",
      });
    }
    if (flight[0] === 0) {
      return res.status(400).json({
        success: false,
        message: "Flight not found",
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
