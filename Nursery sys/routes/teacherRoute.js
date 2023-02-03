const express = require("express");
const teacherroute = express.Router();

const controller = require("./../controller/teachercontroller");

const authorizationmw = require("./../core/authorization/authorization");

const {
  addTeachervalidation,
  updateTeachervalidation,
  deleteTeachervalidation,
  paramvalidation,
} = require("./../core/validations/teachervalidatin");

const checkvalidation = require("./../core/validations/checkvalidation");

teacherroute
  .route("/teacher")
  .get(authorizationmw.checkAdmin, controller.getAllteachers)
  .post(
    authorizationmw.checkAdmin,
    addTeachervalidation,
    checkvalidation,
    controller.addTeacher
  )
  .patch(updateTeachervalidation, checkvalidation, controller.updateTeacher)
  .delete(
    authorizationmw.checkAdmin,
    deleteTeachervalidation,
    checkvalidation,
    controller.deleteTeacher
  );

teacherroute.get(
  "/teacher/:_id",
  paramvalidation,
  checkvalidation,
  controller.getteacherById
);
module.exports = teacherroute;
