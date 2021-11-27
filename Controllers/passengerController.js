let db = require("../models/index");

exports.createPassenger = async (req, res) => {
  const Passenger = db.passenger;
  const body = req.body;

  const passenger = await Passenger.findOne({
    where: { email: body.email },
  });
  if (!passenger) {
    const data = await Passenger.create({
      firstName: body.firstName,
      email: body.email,
      phone: body.phone,
      lastName: body.lastName,
    });

    res.status(200).json({
      success: true,
      message: "Passenger created",
      data,
    });
  } else {
    res.status(400).json({
      success: false,
      message: "Passenger exist already",
    });
  }
};
exports.fetchAllPassenger = async (req, res) => {
  const Passenger = db.passenger;

  const passenger = await Passenger.findAll({
    attributes: { exclude: ["createdAt", "updatedAt"] },
    include: { all: true, attributes: { exclude: ["createdAt", "updatedAt"] } },
  });
  if (passenger.length == 0) {
    return res.status(404).json({
      success: false,
      message: "Passenger not found",
    });
  }
  res.status(200).json({
    success: true,
    length: passenger.length,
    message: "Passenger fetched successfully",
    data: passenger,
  });
};
exports.fetchPassengerById = async (req, res) => {
  const Passenger = db.passenger;
  const id = req.params.id;

  const passenger = await Passenger.findOne({
    attributes: { exclude: ["createdAt", "updatedAt"] },
    where: { id: id },
    include: { all: true, attributes: { exclude: ["createdAt", "updatedAt"] } },
  });
  if (!passenger) {
    return res.status(404).json({
      success: false,
      message: "Passenger not found",
    });
  }
  res.status(200).json({
    success: true,
    message: "Passenger fetched successfully",
    data: passenger,
  });
};
exports.updatePassenger = async (req, res) => {
  const Passenger = db.passenger;
  const body = req.body;
  const id = req.params.id;

  const newData = {
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email,
    phone: body.phone,
  };

  const passenger = await Passenger.update(newData, {
    where: { id: id },
  });
  if (passenger[0] === 1) {
    return res.status(200).json({
      success: true,
      message: "Passenger updated",
    });
  }
  if (passenger[0] === 0) {
    return res.status(400).json({
      success: false,
      message: "Passenger not found",
    });
  }
};
