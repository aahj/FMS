let db = require("../models/index");

exports.fetchAllTicket = async (req, res) => {
  const Ticket = db.ticket;

  const ticket = await Ticket.findAll({
    attributes: { exclude: ["createdAt", "updatedAt"] },
    include: { all: true, attributes: { exclude: ["createdAt", "updatedAt"] } },
  });
  if (ticket.length == 0) {
    res.status(404).json({
      success: false,
      message: "Ticket not found",
    });
  }
  res.status(200).json({
    success: true,
    length: ticket.length,
    message: "Ticket fetched successfully",
    data: ticket,
  });
};
exports.fetchTicketById = async (req, res) => {
  const Ticket = db.ticket;
  const id = req.params.id;

  const ticket = await Ticket.findOne({
    attributes: { exclude: ["createdAt", "updatedAt"] },
    where: { id: id },
    include: { all: true, attributes: { exclude: ["createdAt", "updatedAt"] } },
  });
  if (!ticket) {
    return res.status(404).json({
      success: false,
      message: "Ticket not found",
    });
  }
  res.status(200).json({
    success: true,
    message: "Ticket fetched successfully",
    data: ticket,
  });
};
exports.updateTicket = async (req, res) => {
  const sequelize = db.sequelize;
  const transaction = await sequelize.transaction();

  try {
    const Ticket = db.ticket;
    const body = req.body;
    const id = req.params.id;

    const newData = {
      firstName: body.firstName,
      lastName: body.lastName,
      phone: body.phone,
      designation: body.designation,
      flightId: body.flightId,
    };

    const ticket = await Ticket.update(
      newData,
      {
        where: { id: id },
      },
      { transaction }
    );
    if (ticket[0] === 1) {
      return res.status(200).json({
        success: true,
        message: "Ticket updated",
      });
    }
    if (ticket[0] === 0) {
      return res.status(400).json({
        success: false,
        message: "Ticket not found",
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
