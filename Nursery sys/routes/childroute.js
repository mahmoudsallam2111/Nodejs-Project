const express = require("express");
const childroute = express.Router();
const controller = require("./../controller/childcontroller");
const authorizationmw = require("./../core/authorization/authorization");
const {
  addchildvalidation,
  updatechildvalidation,
  deletechildvalidation,
  paramvalidation,
} = require("./../core/validations/childvalidation");

const checkvalidation = require("./../core/validations/checkvalidation");

childroute
  .route("/child")
  .get(authorizationmw.checkAdmin, controller.getAllchildren)
  .post(addchildvalidation, checkvalidation, controller.addchild)
  .patch(updatechildvalidation, checkvalidation, controller.updatechild)
  .delete(deletechildvalidation, checkvalidation, controller.deletechild);

childroute.get(
  "/child/:id",
  paramvalidation,
  checkvalidation,
  controller.getchildById
);
module.exports = childroute;
