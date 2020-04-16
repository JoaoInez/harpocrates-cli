const Cryptr = require("cryptr");

const withCryptr = (f) => (string) => (encryptionKey) => {
  const cryptr = new Cryptr(encryptionKey);
  return f(cryptr, string);
};

exports.encrypt = withCryptr((cryptr, string) => cryptr.encrypt(string));
exports.decrypt = withCryptr((cryptr, string) => {
  try {
    return cryptr.decrypt(string);
  } catch (error) {
    throw new Error("DECRYPT_FAILED");
  }
});
