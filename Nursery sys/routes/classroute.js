const express = require("express");
const classroute = express.Router();
const controller = require("./../controller/classcontroller");
const authorizationmw = require("./../core/authorization/authorization");
const {
  addclassvalidation,
  updateclassvalidation,
  deleteclassvalidation,
  paramvalidation,
} = require("./../core/validations/classvalidatin");
const checkvalidation = require("./../core/validations/checkvalidation");
classroute
  .route("/class")
  .get(authorizationmw.checkAdmin, controller.getAllclass)
  .post(
    authorizationmw.checkAdmin,
    addclassvalidation,
    checkvalidation,
    controller.addclass
  )
  .patch(
    authorizationmw.checkAdmin,
    updateclassvalidation,
    checkvalidation,
    controller.updateclass
  )
  .delete(
    authorizationmw.checkAdmin,
    deleteclassvalidation,
    checkvalidation,
    controller.deleteclass
  );
classroute.get(
  "/class/:id",
  paramvalidation,
  checkvalidation,
  controller.getClassById
);

classroute.get(
  "/classchildren/:id",

  paramvalidation,
  checkvalidation,
  controller.getclasschildren
);

classroute.get(
  "/classteachers/:id",
  paramvalidation,
  checkvalidation,
  controller.getclassteachers
);

module.exports = classroute;
