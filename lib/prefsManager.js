const Conf = require("conf");

const withConfig = (f) => (...args) => {
  const config = new Conf({ configName: "prefs" });
  return f(config, ...args);
};

exports.initConf = withConfig((config, _prefs) => {
  const prefs = _prefs
    ? _prefs
    : {
        masterKey: false,
        secretViewMode: "visible",
        secretSetType: "password",
        copyToClipboard: true,
      };
  config.store = prefs;
});

exports.confPath = withConfig((config) => config.path);
exports.getPrefs = withConfig((config) => config.store);
exports.getMasterKey = withConfig((config) => config.get("masterKey"));

exports.getSecretViewMode = withConfig((config) =>
  config.get("secretViewMode")
);

exports.getSecretSetType = withConfig((config) => config.get("secretSetType"));
