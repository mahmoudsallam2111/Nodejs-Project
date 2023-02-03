const { body, param, query } = require("express-validator");
module.exports.addTeachervalidation = [
  body("_id").optional().isMongoId().withMessage("_id must be object"),
  body("fullname")
    .isAlpha("en-US", { ignore: " " })
    .withMessage("fullname must be string"),
  body("password")
    .isStrongPassword()
    .withMessage("password must be strong password"),
  body("email").isEmail().withMessage("email must in mail form"),
  body("image").isString().withMessage("image must be string"),
];

module.exports.updateTeachervalidation = [
  body("_id").isMongoId().withMessage("teacher id must be entered"),
  body("fullname")
    .optional()
    .isAlpha("en-US", { ignore: " " })
    .withMessage("fullname must be string"),
  body("password")
    .optional()
    .isStrongPassword()
    .withMessage("password must be strong password"),
  body("email").optional().isEmail().withMessage("email must in mail form"),
];

module.exports.deleteTeachervalidation = [
  body("_id").isMongoId().withMessage("teacher id must be entered"),
];

module.exports.paramvalidation = [
  param("_id")
    .notEmpty()
    .withMessage("id is required")
    .isMongoId({ min: 1 })
    .withMessage("id must be a num"),
];
