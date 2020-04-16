const fs = require("fs");

exports.readFileSync = (path, encoding) => {
  try {
    return fs.readFileSync(path, { encoding });
  } catch (error) {
    throw new Error("READ_FILE_FAILED");
  }
};

exports.appendFileSync = (path, data) => {
  try {
    return fs.appendFileSync(path, data);
  } catch (error) {
    throw new Error("WRITE_FILE_FAILED");
  }
};
