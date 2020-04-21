const { error } = require("./signales");

const errors = {
  ABORT: error.abort,
  FATAL: error.fatal,
  SECRETS_FILE_ALREADY_EXISTS: error.secretsFileAlreadyExists,
  NO_MASTER_KEY: error.noMasterKey,
  INCORRECT_MASTER_KEY: error.incorrectMasterKey,
  NO_SECRET_FOUND: error.noSecretFound,
  NO_SECRETS: error.noSecrets,
  FILE_INCOMPATIBLE: error.fileIncompatible,
  READ_FILE_FAILED: error.readFileFailed,
  WRITE_FILE_FAILED: error.writeFileFailed,
  DECRYPT_FAILED: error.decryptFailed,
};

module.exports = ({ message }) => {
  if (errors.hasOwnProperty(message)) errors[message]();
  else errors.FATAL();
};
