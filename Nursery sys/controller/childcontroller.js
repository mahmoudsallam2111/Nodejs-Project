const mongoose = require("mongoose");
require("./../model/childModel");

const childtSchema = mongoose.model("childs");

module.exports.getAllchildren = (request, response, next) => {
  childtSchema
    .find({})
    .then((data) => {
      response.status(200).json({ data });
    })
    .catch((error) => {
      next(error);
    });
};

module.exports.getchildById = (request, response, next) => {
  childtSchema
    .findOne({ id: request.params.id })
    .then((data) => {
      if (data == null) {
        throw new Error("child does not exist");
      } else {
        response.status(200).json({ data });
      }
    })
    .catch((error) => {
      next(error);
    });
};

module.exports.addchild = (request, response, next) => {
  let childObject = new childtSchema({
    _id: request.body._id,
    fullname: request.body.fullname,
    age: request.body.age,
    level: request.body.level,
  });
  childObject
    .save()
    .then((data) => {
      response.status(201).json({ data });
    })
    .catch((error) => {
      next(error);
    });
};

module.exports.updatechild = (request, response, next) => {
  childtSchema
    .updateOne(
      { _id: request.body._id },
      {
        $set: {
          fullname: request.body.fullname,
          age: request.body.email,
          level: request.body.password,
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

module.exports.deletechild = (request, response, next) => {
  childtSchema
    .deleteOne({ _id: request.body._id })
    .then((data) => {
      response.status(202).json({ data: "delete child" });
    })
    .catch((err) => {
      next(err);
    });
};
