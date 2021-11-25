const express = require("express");
const router = express.Router();

const { registerUser ,fetchAllUser,fetchUserById,login} = require("../Controllers/userController");
router.route("/userRegister").post(registerUser)
router.route("/user").get(fetchAllUser)
router.route("/user/:id").get(fetchUserById)
router.route("/auth").post(login)


module.exports = router;