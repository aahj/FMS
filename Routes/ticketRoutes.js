const express = require("express");
const router = express.Router();

const {
  fetchAllTicket,
  fetchTicketById,
  updateTicket,
} = require("../Controllers/ticketController");

router.route("/ticket").get(fetchAllTicket);
router.route("/ticket/:id").get(fetchTicketById);
router.route("/ticket/:id").put(updateTicket);

module.exports = router;
