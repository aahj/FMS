const express = require("express");
const router = express.Router();

const {
  createPassenger,
  fetchAllPassenger,
  fetchPassengerById,
  updatePassenger,
} = require("../Controllers/passengerController");

router.route("/passenger").post(createPassenger);
router.route("/passenger").get(fetchAllPassenger);
router.route("/passenger/:id").get(fetchPassengerById);
router.route("/passenger/:id").put(updatePassenger);

module.exports = router;
