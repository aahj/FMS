const express = require("express");
const router = express.Router();

const {
  createBoardingPass,
  fetchAllBoardingPass,
  fetchBoardingPassById,
  updateBoardingPass,
} = require("../Controllers/boardingController");

router.route("/boardingpass").post(createBoardingPass);
router.route("/boardingpass").get(fetchAllBoardingPass);
router.route("/boardingpass/:id").get(fetchBoardingPassById);
router.route("/boardingpass/:id").put(updateBoardingPass);

module.exports = router;
