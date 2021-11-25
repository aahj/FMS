const express = require("express");
const router = express.Router();

const {
  createAirline,
  fetchAllAirline,
  fetchAirlineById,
  updateAirline,
} = require("../Controllers/airlineController");

router.route("/airline").post(createAirline);
router.route("/airline").get(fetchAllAirline);
router.route("/airline/:id").get(fetchAirlineById);
router.route("/airline/:id").put(updateAirline);

module.exports = router;
