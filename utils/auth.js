const fs = require("fs");
const {
  confPath: secretsPath,
  checkConf: checkSecrets,
} = require("../lib/secretsManager");
const {
  confPath: prefsPath,
  initConf,
  getMasterKey,
} = require("../lib/prefsManager");
const prompts = require("./prompts");
const { enterMasterKeyQ } = require("./questions");
const errorHandler = require("./errorHandler");

module.exports = (f) => async (...args) => {
  try {
    if (!fs.existsSync(secretsPath())) throw new Error("NO_MASTER_KEY");

    if (!fs.existsSync(prefsPath())) initConf();

    const prefsMasterKey = getMasterKey();

    if (!prefsMasterKey) {
      const { masterKey, __cancelled__ } = await prompts(enterMasterKeyQ);

      if (__cancelled__) throw new Error("ABORT");
      if (!checkSecrets(masterKey)) throw new Error("INCORRECT_MASTER_KEY");

      f(masterKey, ...args);
    } else f(prefsMasterKey, ...args);
  } catch (error) {
    errorHandler(error);
  }
};
