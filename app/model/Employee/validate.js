const validator = require('validator');

function isValidEmail(value) {
  return validator.isLength(value, { min: 4 });
}

module.exports = {
  isValidEmail
};
