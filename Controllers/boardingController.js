let db = require("../models/index");

exports.createBoardingPass = async (req, res) => {
  const sequelize = db.sequelize;

  const transaction = await sequelize.transaction();
  try {
    const BoardingPass = db.boardingPass;
    const Passenger = db.passenger;
    const Ticket = db.ticket;
    const Flight = db.flight;
    const Baggage = db.Baggage;

    const body = req.body;

    const flight = await Flight.findOne({ where: { id: body.flightId } });
    if (!flight) {
      return res.status(404).json({
        success: false,
        message: "flight not found",
      });
    }
    const passenger = await Passenger.create(body.passenger, { transaction });
    if (!passenger) {
      throw { message: "Passenger not created" };
    }
    // add fk into ticket table
    body.ticket.passengerId = passenger.id;
    const ticket = await Ticket.create(body.ticket, { transaction });
    if (!ticket) {
      throw { message: "Ticket not created" };
    }
    // add fk into baggage table
    body.baggage.passengerId = passenger.id;
    const baggage = await Baggage.create(body.baggage, { transaction });
    if (!baggage) {
      throw { message: "Baggage not created" };
    }
    const boardingPass = await BoardingPass.findOne({
      where: { passengerId: passenger.id },
    });
    if (!boardingPass) {
      const data = await BoardingPass.create(
        {
          hasCheckin: body.hasCheckin,
          gate: body.gate,
          passengerId: passenger.id,
          ticketId: ticket.id,
          baggageId: baggage.id,
          flightId: body.flightId,
        },
        { transaction }
      );

      res.status(200).json({
        success: true,
        message: "BoardingPass created",
        data,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "BoardingPass exist already",
      });
    }
    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
exports.fetchAllBoardingPass = async (req, res) => {
  const BoardingPass = db.boardingPass;

  const boardingPass = await BoardingPass.findAll({include:{all:true}});
  if (boardingPass.length == 0) {
    res.status(404).json({
      success: false,
      message: "BoardingPass not found",
    });
  }
  res.status(200).json({
    success: true,
    length: boardingPass.length,
    message: "BoardingPass fetched successfully",
    data: boardingPass,
  });
};
exports.fetchBoardingPassById = async (req, res) => {
  const BoardingPass = db.boardingPass;
  const id = req.params.id;

  const boardingPass = await BoardingPass.findOne({ where: { id: id },include:{all:true} });
  if (!boardingPass) {
    res.status(404).json({
      success: false,
      message: "BoardingPass not found",
    });
  }
  res.status(200).json({
    success: true,
    message: "BoardingPass fetched successfully",
    data: boardingPass,
  });
};
exports.updateBoardingPass = async (req, res) => {
  const sequelize = db.sequelize;
  const transaction = await sequelize.transaction();

  try {
    const BoardingPass = db.boardingPass;
    const body = req.body;
    const id = req.params.id;

    const newData = {
      firstName: body.firstName,
      lastName: body.lastName,
      phone: body.phone,
      designation: body.designation,
      flightId: body.flightId,
    };

    const boardingPass = await BoardingPass.update(
      newData,
      {
        where: { id: id },
      },
      { transaction }
    );
    if (boardingPass[0] === 1) {
      res.status(200).json({
        success: true,
        message: "BoardingPass updated",
      });
    }
    if (boardingPass[0] === 0) {
      res.status(400).json({
        success: false,
        message: "BoardingPass not found",
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
