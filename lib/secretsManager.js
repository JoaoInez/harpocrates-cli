const Conf = require("conf");

const withConfig = (f) => (...args) => {
  const config = new Conf({ configName: "prefs" });
  return f(config, ...args);
};

const withConfigCurried = (f) => (...args) => (encryptionKey) => {
  const config = new Conf({ configName: "secrets", encryptionKey });
  return f(config, ...args);
};

exports.initConf = withConfig((config) => config.set("secrets", {}));
exports.confPath = withConfig((config) => config.path);
exports.checkConf = withConfig((config) => config.has("secrets"));

exports.getSecret = withConfigCurried((config, key) =>
  config.get(`secrets.${key}`)
);

exports.setSecret = withConfigCurried((config, key, value) =>
  config.set(`secrets.${key}`, value)
);
