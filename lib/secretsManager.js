const Conf = require("conf");

const getConfig = (encryptionKey) =>
  new Conf({ configName: "secrets", encryptionKey });

const withConfig = (f) => (encryptionKey, ...args) => {
  const config = getConfig(encryptionKey);
  return f(config, ...args);
};

const withConfigCurried = (f) => (...args) => (encryptionKey) => {
  const config = getConfig(encryptionKey);
  return f(config, ...args);
};

exports.initConf = withConfig((config) => config.set("secrets", {}));
exports.confPath = withConfig((config) => config.path);
exports.checkConf = withConfig((config) => config.has("secrets"));
exports.setConf = withConfig((config, store) => (config.store = store));

exports.getSecret = withConfigCurried((config, key) =>
  config.get(`secrets.${key}`)
);

exports.setSecret = withConfigCurried((config, key, value) =>
  config.set(`secrets.${key}`, value)
);

exports.deleteSecret = withConfigCurried((config, key) =>
  config.delete(`secrets.${key}`)
);

exports.getAllSecrets = withConfig((config) => config.store);

exports.hasSecret = withConfigCurried((config, key) =>
  config.has(`secrets.${key}`)
);
