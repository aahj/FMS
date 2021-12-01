const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
if (process.env.NODE_ENV !== "production")
  require("dotenv").config({ path: "./.env" });

  app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  let token = req.headers.authorization;
  if (token && token.startsWith("Bearer")) {
    token = token.split(" ")[1];
  }
  if (
    req.url === "/api/v1/auth" ||
    req.url === "/api/v1/userRegister" ||
    req.url === "/api/v1/airplane"
  ) {
    next();
  } else if (token) {
    jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
      let apiResponse = {};
      if (err || decoded.exp < Date.now()) {
        if (err) {
          apiResponse.error = err;
        } else {
          apiResponse.error = "Token Expired";
        }
        return res.status(400).send(apiResponse);
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    const apiResponse = { error: "No authentication token provided" };
    return res.status(400).send(apiResponse);
  }
});

// import routes
const userRoutes = require("./Routes/userRoutes");
const passengerRoutes = require("./Routes/passengerRoutes");
const airlineRoutes = require("./Routes/airlineRoutes");
const flightRoutes = require("./Routes/flightRoutes");
const crewRoutes = require("./Routes/crewRoutes");
const boardingRoutes = require("./Routes/boardingRoutes");
const ticketRoutes = require("./Routes/ticketRoutes");
const airplaneRoutes = require("./Routes/airplaneRoutes");
const airportRoutes = require("./Routes/airportRoutes");

app.use("/api/v1", userRoutes);
app.use("/api/v1", passengerRoutes);
app.use("/api/v1", airlineRoutes);
app.use("/api/v1", flightRoutes);
app.use("/api/v1", crewRoutes);
app.use("/api/v1", boardingRoutes);
app.use("/api/v1", ticketRoutes);
app.use("/api/v1", airplaneRoutes);
app.use("/api/v1", airportRoutes);

app.listen(process.env.PORT, () =>
  console.log(` app listening on port ${process.env.PORT}!`)
);
