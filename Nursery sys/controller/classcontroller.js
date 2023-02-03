const mongoose = require("mongoose");
require("./../model/classModel");

const classSchema = mongoose.model("class");
const teacherSchema = mongoose.model("teachers");

module.exports.getAllclass = (request, response, next) => {
  classSchema
    .find({})
    .populate({ path: "_id" })
    .then((data) => {
      response.status(200).json({ data });
    })
    .catch((error) => {
      next(error);
    });
};

module.exports.getClassById = (request, response, next) => {
  classSchema
    .findOne({ id: request.params.id })
    .then((data) => {
      if (data == null) {
        throw new Error("class does not exist");
      } else {
        response.status(200).json({ data });
      }
    })
    .catch((error) => {
      next(error);
    });
};

module.exports.getclasschildren = (request, response, next) => {
  response
    .status(200)
    .json({ data: ` list of class children with id ${request.params.id}` });
};

module.exports.getclassteachers = (request, response, next) => {
  response
    .status(200)
    .json({ data: ` list of class teachers with id ${request.params.id}` });
};

module.exports.addclass = (request, response, next) => {
  let classObject = new classSchema({
    name: request.body.fullname,
    supervisor: request.body.supervisor,
    children: request.body.children,
  });
  classObject
    .save()
    .then((data) => {
      response.status(201).json({ data });
    })
    .catch((error) => {
      next(error);
    });
};

module.exports.updateclass = (request, response, next) => {
  classSchema
    .updateOne(
      { _id: request.body._id },
      {
        $set: {
          name: request.body.fullname,
          supervisor: request.body.supervisor,
          children: request.body.children,
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

module.exports.deleteclass = (request, response, next) => {
  classSchema
    .deleteOne({ _id: request.body._id })
    .then((data) => {
      response.status(202).json({ data: "delete class" });
    })
    .catch((err) => {
      next(err);
    });
};
