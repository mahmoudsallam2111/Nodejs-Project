const express = require("express");
const morgan = require("morgan");
require("dotenv").config();
const mongoose = require("mongoose");
const teacherroute = require("./routes/teacherRoute");
const childroute = require("./routes/childroute");
const classroute = require("./routes/classroute");
const authenticationroute = require("./routes/authenticationroute");
const authorizationmw = require("./core/authorization/authorization");

let server = express(); // using default fn to create HTTPserver

let port = process.env.PORT || 8080; /// var contains port number

mongoose.set("strictQuery", true);
mongoose
  .connect("mongodb://0.0.0.0:27017/NurserySystem")
  .then(() => {
    console.log("connected  to MongoDB .....");
    /// listen to server
    server.listen(port, () => {
      console.log("listening on port " + port);
    });
  })
  .catch((error) => {
    console.log("error connecting to MongoDB" + error);
  });

// (1) first mw using morgan
// using morgan as a logger
server.use(morgan("tiny")); ////morgan(':method :url :status :res[content-length] - :response-time ms')

/// routes
server.use(express.json());
server.use(authenticationroute);
server.use(authorizationmw);
server.use(teacherroute);
server.use(childroute);
server.use(classroute);

// (2)not found mw
server.use((resqust, response, next) => {
  response.status(404).json({ message: "page not found" });
});

///  (3) error mw
server.use((error, resqust, response, next) => {
  let status = error.status || 500;
  response.status(status).json({ message: error + "" });
});
