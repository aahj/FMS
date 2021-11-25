const express = require("express");
const router = express.Router();

const {
  createAirplane,
  fetchAllAirplane,
  fetchAirplaneById,
  updateAirplane,
} = require("../Controllers/airplaneController");

router.route("/airplane").post(createAirplane);
router.route("/airplane").get(fetchAllAirplane);
router.route("/airplane/:id").get(fetchAirplaneById);
router.route("/airplane/:id").put(updateAirplane);

module.exports = router;
