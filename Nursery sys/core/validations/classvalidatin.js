const { body, param, query } = require("express-validator");
module.exports.addclassvalidation = [
  body("_id").optional().isNumeric().withMessage("id is not a number"),
  body("name").isAlpha().withMessage("name must be a string"),

  body("supervisor").isMongoId().withMessage("supervisor must be included"),
  body("children[*]").isInt().withMessage("children element must be integer"),
];

module.exports.updateclassvalidation = [
  body("_id").exists().withMessage("class id must be entered"),
  body("name").optional().isAlpha().withMessage("name must be string"),
];

module.exports.deleteclassvalidation = [
  body("_id").exists().withMessage("class id must be entered"),
];

module.exports.paramvalidation = [
  param("id")
    .notEmpty()
    .withMessage("id is required")
    .isInt({ min: 1 })
    .withMessage("id must be a num")
    .toInt(),
];
