const fs = require("fs");

exports.readFileSync = (path, encoding) => {
  try {
    return fs.readFileSync(path, { encoding });
  } catch (error) {
    throw new Error("Couldn't read file");
  }
};

exports.appendFileSync = (path, data) => {
  try {
    return fs.appendFileSync(path, data);
  } catch (error) {
    throw new Error("Couldn't write to file");
  }
};
