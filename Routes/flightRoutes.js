const express = require("express");
const router = express.Router();

const {
  createFlight,
  fetchAllFlight,
  fetchFlightById,
  updateFlight,
} = require("../Controllers/flightController");

router.route("/flight").post(createFlight);
router.route("/flight").get(fetchAllFlight);
router.route("/flight/:id").get(fetchFlightById);
router.route("/flight/:id").put(updateFlight);

module.exports = router;
