const Conf = require("conf");

exports.initConf = (encryptionKey) => {
  const config = new Conf({ encryptionKey });
  config.set("secrets", {});
};

exports.confPath = () => {
  const config = new Conf();
  return config.path;
};

exports.checkConf = (encryptionKey) => {
  const config = new Conf({ encryptionKey });
  return config.has("secrets");
};

exports.getSecret = (encryptionKey) => (key) => {
  const config = new Conf({ encryptionKey });
  return config.get(`secrets.${key}`);
};

exports.setSecret = (encryptionKey) => (key, value) => {
  const config = new Conf({ encryptionKey });
  config.set(`secrets.${key}`, value);
  return true;
};
