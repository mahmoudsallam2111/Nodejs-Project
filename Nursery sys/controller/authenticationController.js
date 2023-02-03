const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const teacherSchema = mongoose.model("teachers");
module.exports.login = (request, response, next) => {
  if (request.body.username == "mahmoud" && request.body.password == "123") {
    let token = jwt.sign(
      {
        role: "admin",
        _id: 1,
        name: "mahmoud",
      },
      "adminkey",
      { expiresIn: "2h" }
    );
    response.status(200).json({ data: "lodin as admin", token });
  } else {
    teacherSchema
      .findOne({
        username: request.body.username,
        password: request.body.password,
      })
      .then((data) => {
        if (data == null) {
          let error = new Error("");
          error.status = 401;
          throw error;
        } else {
          let token = jwt.sign(
            {
              role: "student",
              _id: data._id,
              name: data.username,
            },
            "adminkey",
            { expiresIn: "2h" }
          );
          response.status(200).json({ data: "login as student", token });
        }
      })
      .catch((error) => {
        error = new Error("not authenticated");
        error.status = 401;
        next(error);
      });
  }
};
