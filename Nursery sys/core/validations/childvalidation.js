const { body, param, query, check } = require("express-validator");
module.exports.addchildvalidation = [
  body("_id").isMongoId().withMessage("_id must be number"),
  body("fullname").isString().withMessage("fullname must be string"),
  body("age").isInt().withMessage("age must be integer"),

  body("level")
    .exists()
    .withMessage("level is Requiered")
    .isString()
    .withMessage("levelmust be a String")
    .isIn(["prekg", "kg1", "kg2"])
    .withMessage("levels does contain invalid value"),

  body("address").optional(),
  body("address.city")
    .optional()
    .isString()
    .withMessage("city field must be a string"),
  body("address.street")
    .optional()
    .isInt()
    .withMessage("street field must be a integer"),
  body("address.building")
    .optional()
    .isInt()
    .withMessage("buildings field must be a integer"),
];

module.exports.updatechildvalidation = [
  body("_id").exists().withMessage("child id must be entered"),
  body("name").optional().isAlpha().withMessage("name must be string"),
  body("age").optional().isInt().withMessage("age must be integer"),
  body("level").optional().isString().withMessage("level must be string"),
];

module.exports.deletechildvalidation = [
  body("_id").exists().withMessage("child id must be entered"),
];

module.exports.paramvalidation = [
  param("id")
    .notEmpty()
    .withMessage("id is required")
    .isMongoId({ min: 1 })
    .withMessage("id must be a num"),
];
