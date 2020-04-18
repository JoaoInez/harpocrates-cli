const fs = require("fs");

exports.readFileSync = (path, encoding) => {
  try {
    return fs.readFileSync(path, { encoding });
  } catch (error) {
    throw new Error("READ_FILE_FAILED");
  }
};

exports.writeFileSync = (path, data) => {
  try {
    return fs.writeFileSync(path, data);
  } catch (error) {
    throw new Error("WRITE_FILE_FAILED");
  }
};
