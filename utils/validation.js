exports.notEmpty = (value) => (value === "" ? "Cannot be empty" : true);

exports.noMatch = (value2, message) => (value1) =>
  value2 !== value1 ? message : true;
