const Conf = require("conf");

const withConfig = (f) => (...args) => {
  const config = new Conf({ configName: "prefs" });
  return f(config, ...args);
};

// TODO: combine prefs into groups

exports.initConf = withConfig((config, _prefs) => {
  const prefs = _prefs
    ? _prefs
    : {
        masterKey: false,
        secretViewMode: "visible",
        secretSetType: "text",
        copyToClipboard: true,
        length: 16,
        numbers: true,
        symbols: true,
        lowercase: true,
        uppercase: true,
        excludeSimilarCharacters: false,
        exclude: "",
        strict: true,
      };
  config.store = prefs;
});

exports.confPath = withConfig((config) => config.path);
exports.getMasterKey = withConfig((config) => config.get("masterKey"));
exports.getSecretSetType = withConfig((config) => config.get("secretSetType"));

exports.getSecretViewMode = withConfig((config) =>
  config.get("secretViewMode")
);

exports.getSecretViewPrefs = withConfig((config) => ({
  secretViewMode: config.get("secretViewMode"),
  copyToClipboard: config.get("copyToClipboard"),
}));

exports.setMasterKey = withConfig((config, masterKey) =>
  config.set("masterKey", masterKey)
);

exports.getGenPasswordPrefs = withConfig((config) => ({
  length: config.get("length"),
  numbers: config.get("numbers"),
  symbols: config.get("symbols"),
  lowercase: config.get("lowercase"),
  uppercase: config.get("uppercase"),
  excludeSimilarCharacters: config.get("excludeSimilarCharacters"),
  exclude: config.get("exclude"),
  strict: config.get("strict"),
}));
