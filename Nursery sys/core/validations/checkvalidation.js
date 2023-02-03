const { validationResult } = require("express-validator");

module.exports = (request, response, next) => {
  const result = validationResult(request);
  if (result.errors.length == 0) {
    next();
  } else {
    let errormessage = result.errors.reduce(
      (current, object) => current + object.msg + " , ",
      ""
    );
    let error = Error(errormessage);
    error.status = 442;
    next(error);
  }
};
