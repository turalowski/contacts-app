const isEmpty = require("is-empty");

export const validateForm = (data) => {
  var error = "";
  if (
    isEmpty(data.firstName) ||
    isEmpty(data.lastName) ||
    isEmpty(data.number)
  ) {
    error = "All fields need to be filled.";
  }
  return {
    isValid: isEmpty(error),
    error,
  };
};
