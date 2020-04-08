const fs = require("fs");
const signale = require("signale");
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
const { signaleAbort } = require("./signales");

exports.auth = (f) => async (...args) => {
  if (!fs.existsSync(secretsPath())) {
    signale.fatal("No master key found!");
    signale.info("Run $ harpocrates init to create one.");
    return;
  }

  if (!fs.existsSync(prefsPath())) initConf();

  const prefsMasterKey = getMasterKey();

  if (!prefsMasterKey) {
    const { masterKey, __cancelled__ } = await prompts(enterMasterKeyQ);

    if (__cancelled__) return signaleAbort();
    if (!checkSecrets(masterKey)) return signale.fatal("Incorrect master key!");

    f(masterKey, ...args);
  } else {
    f(prefsMasterKey, ...args);
  }
};
