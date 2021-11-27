let db = require("../models/index");
const sendToken = require("../utills/jwtToken");
const bcrypt = require("bcryptjs");

exports.registerUser = async (req, res) => {
  const User = db.user;
  const body = req.body;

  const user = await User.findOne({
    where: { email: body.email },
  });
  if (!user) {
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(body.password, salt);
    const data = await User.create({
      name: body.name,
      email: body.email,
      phone: body.phone,
      password: password,
    });

    res.status(200).json({
      success: true,
      message: "User created",
      data,
    });
  } else {
    res.status(400).json({
      success: false,
      message: "User exist already",
    });
  }
};
exports.fetchAllUser = async (req, res) => {
  const User = db.user;

  const user = await User.findAll({
    attributes: { exclude: ["createdAt", "updatedAt"] },
  });
  if (user.length == 0) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }
  // user.forEach(x=>delete x["password"])
  res.status(200).json({
    success: true,
    length: user.length,
    message: "User fetched successfully",
    data: user,
  });
};
exports.fetchUserById = async (req, res) => {
  const User = db.user;
  const id = req.params.id;

  const user = await User.findOne({
    attributes: { exclude: ["createdAt", "updatedAt"] },
    where: { id: id },
  });
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }
  res.status(200).json({
    success: true,
    message: "User fetched successfully",
    data: user,
  });
};
exports.login = async (req, res) => {
  const User = db.user;
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({
      success: false,
      message: "Please enter email or password",
    });
  }
  const user = await User.findOne({ where: { email: email } });
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "Invalid email or password",
    });
  }
  const comparePassword = await bcrypt.compare(password, user.password);
  if (!comparePassword) {
    res.status(404).json({
      success: false,
      message: "Invalid email or password",
    });
  }
  let myUser = user.dataValues;
  delete myUser["password"];
  sendToken(user, 200, res);
};
