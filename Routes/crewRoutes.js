const express = require("express");
const router = express.Router();

const {
  createCrew,
  fetchAllCrew,
  fetchCrewById,
  updateCrew,
} = require("../Controllers/crewController");

router.route("/crew").post(createCrew);
router.route("/crew").get(fetchAllCrew);
router.route("/crew/:id").get(fetchCrewById);
router.route("/crew/:id").put(updateCrew);

module.exports = router;
