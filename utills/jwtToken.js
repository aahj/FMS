const jwt = require("jsonwebtoken");
const sendToken = (user, statusCode, res) => {
  const token = jwt.sign({ userId: user.id }, process.env.JWT_KEY, {
    expiresIn: Date.now() + process.env.JWT_EXPIRES_IN * 24 * 3600 * 1000,
  });
  res.status(statusCode).json({
    success: true,
    token,
    user,
  });
};
module.exports = sendToken;
