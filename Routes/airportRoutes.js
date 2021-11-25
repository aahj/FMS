const express = require("express");
const router = express.Router();

const {
  createAirport,
  fetchAllAirport,
  fetchAirportById,
  updateAirport,
} = require("../Controllers/airportController");

router.route("/airport").post(createAirport);
router.route("/airport").get(fetchAllAirport);
router.route("/airport/:id").get(fetchAirportById);
router.route("/airport/:id").put(updateAirport);

module.exports = router;
