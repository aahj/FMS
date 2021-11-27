let db = require("../models/index");

exports.createCrew = async (req, res) => {
  const sequelize = db.sequelize;

  const transaction = await sequelize.transaction();
  try {
    const Crew = db.crew;
    const Flight = db.flight;

    const body = req.body;

    const crew = await Crew.findOne({
      where: { phone: body.phone },
    });
    const flight = await Flight.findOne({ where: { id: body.flightId } });
    if (!flight) {
      return res.status(404).json({
        success: false,
        message: "flight not found",
      });
    }
    if (!crew) {
      const data = await Crew.create(
        {
          firstName: body.firstName,
          lastName: body.lastName,
          phone: body.phone,
          designation: body.designation,
          flightId: body.flightId,
        },
        { transaction }
      );

      res.status(200).json({
        success: true,
        message: "Crew created",
        data,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Crew exist already",
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
exports.fetchAllCrew = async (req, res) => {
  const Crew = db.crew;

  const crew = await Crew.findAll({
    attributes: { exclude: ["createdAt", "updatedAt"] },
    include: { all: true, attributes: { exclude: ["createdAt", "updatedAt"] } },
  });
  if (crew.length == 0) {
    return res.status(404).json({
      success: false,
      message: "Crew not found",
    });
  }
  res.status(200).json({
    success: true,
    length: crew.length,
    message: "Crew fetched successfully",
    data: crew,
  });
};
exports.fetchCrewById = async (req, res) => {
  const Crew = db.crew;
  const id = req.params.id;

  const crew = await Crew.findOne({
    attributes: { exclude: ["createdAt", "updatedAt"] },
    where: { id: id },
    include: { all: true, attributes: { exclude: ["createdAt", "updatedAt"] } },
  });
  if (!crew) {
    return res.status(404).json({
      success: false,
      message: "Crew not found",
    });
  }
  res.status(200).json({
    success: true,
    message: "Crew fetched successfully",
    data: crew,
  });
};
exports.updateCrew = async (req, res) => {
  const sequelize = db.sequelize;
  const transaction = await sequelize.transaction();

  try {
    const Crew = db.crew;
    const body = req.body;
    const id = req.params.id;

    const newData = {
      firstName: body.firstName,
      lastName: body.lastName,
      phone: body.phone,
      designation: body.designation,
      flightId: body.flightId,
    };

    const crew = await Crew.update(
      newData,
      {
        where: { id: id },
      },
      { transaction }
    );
    if (crew[0] === 1) {
      return res.status(200).json({
        success: true,
        message: "Crew updated",
      });
    }
    if (crew[0] === 0) {
      return res.status(400).json({
        success: false,
        message: "Crew not found",
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
