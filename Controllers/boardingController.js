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

  const boardingPass = await BoardingPass.findAll({
    attributes: { exclude: ["createdAt", "updatedAt"] },
    include: { all: true, attributes: { exclude: ["createdAt", "updatedAt"] } },
  });
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

  const boardingPass = await BoardingPass.findOne({
    where: { id: id },
    attributes: { exclude: ["createdAt", "updatedAt"] },
    include: { all: true, attributes: { exclude: ["createdAt", "updatedAt"] } },
  });
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
    const Passenger = db.passenger;
    const Ticket = db.ticket;
    const Flight = db.flight;
    const Baggage = db.Baggage;
    const body = req.body;
    const id = req.params.id;

    const findBoarding = await BoardingPass.findOne({ where: { id: id } });
    if (!findBoarding) {
      return res.status(404).json({
        success: false,
        message: "Boarding Pass not found",
      });
    }
    if (body.passenger) {
      const updatePassenger = await Passenger.update(body.passenger, {
        where: { id: findBoarding.passengerId },
      });

      if (updatePassenger[0] === 0) {
        throw { message: "failed to update passenger" };
      }
    }

    if (body.ticket) {
      const updateTicket = await Ticket.update(body.ticket, {
        where: { id: findBoarding.ticketId },
      });
      if (updateTicket[0] === 0) {
        throw { message: "failed to update ticket" };
      }
    }

    if (body.baggage) {
      const updateBaggage = await Baggage.update(body.baggage, {
        where: { id: findBoarding.baggageId },
      });
      if (updateBaggage[0] === 0) {
        throw { message: "failed to update baggage" };
      }
    }

    const newData = {
      hasCheckin: body.hasCheckin,
      gate: body.gate,
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
      return res.status(200).json({
        success: true,
        message: "BoardingPass updated",
      });
    }
    if (boardingPass[0] === 0) {
      return res.status(400).json({
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
