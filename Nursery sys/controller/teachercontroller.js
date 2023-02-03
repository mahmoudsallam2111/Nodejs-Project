const mongoose = require("mongoose");
require("./../model/teacherModel");

const teachrtSchema = mongoose.model("teachers");

module.exports.getAllteachers = (request, response, next) => {
  teachrtSchema
    .find({})
    .then((data) => {
      response.status(200).json({ data });
    })
    .catch((error) => {
      next(error);
    });
};

module.exports.getteacherById = (request, response, next) => {
  teachrtSchema
    .findOne({ _id: request.params._id })
    .then((data) => {
      if (data == null) {
        throw new Error("teacher does not exist");
      } else {
        response.status(200).json({ data });
      }
    })
    .catch((error) => {
      next(error);
    });
};

module.exports.addTeacher = (request, response, next) => {
  let teacherObject = new teachrtSchema({
    _id: request.body._id,
    fullname: request.body.fullname,
    email: request.body.email,
    password: request.body.password,
  });
  teacherObject
    .save()
    .then((data) => {
      response.status(201).json({ data });
    })
    .catch((error) => {
      next(error);
    });
};

module.exports.updateTeacher = (request, response, next) => {
  teachrtSchema
    .updateOne(
      { _id: request.body._id },
      {
        $set: {
          fullname: request.body.fullname,
          email: request.body.email,
          password: request.body.password,
        },
      }
    )
    .then((data) => {
      response.status(202).json({ data });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports.deleteTeacher = (request, response, next) => {
  teachrtSchema
    .deleteOne({ _id: request.body._id })
    .then((data) => {
      response.status(202).json({ data: "delete Teacher" });
    })
    .catch((err) => {
      next(err);
    });
};
