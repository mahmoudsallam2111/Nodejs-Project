const { request, response } = require("express");
const jwt = require("jsonwebtoken");

module.exports = (request, response, next) => {
  try {
    const token = request.get("authorization").split(" ")[1];
    const decodedtoken = jwt.verify(token, "adminkey"); //====>
    request.role = decodedtoken.role;
    request.id = decodedtoken.id;
    next();
  } catch (error) {
    error.message = "not authenticated ";
    error.status = 401;
    next(error);
  }
};

module.exports.checkAdmin = (request, response, next) => {
  console.log(request.role, " check admin");
  if (request.role == "admin") {
    next();
  } else {
    let error = new Error("not authorized");
    error.status = 403;
    next(error);
  }
};
