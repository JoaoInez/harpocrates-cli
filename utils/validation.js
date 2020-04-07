const fs = require("fs");
const signale = require("signale");
const prompts = require("prompts");
const { confPath, checkConf } = require("../lib/secretManager");

exports.auth = (f) => async (...args) => {
  const path = confPath();
  if (!fs.existsSync(path)) {
    signale.fatal("No master key found!");
    return signale.info("Run $ harpocrates master set to create one.");
  }

  const { masterKey } = await prompts({
    type: "invisible",
    name: "masterKey",
    message: "Enter master key",
  });

  if (!checkConf(masterKey)) {
    return signale.fatal("Incorrect master key!");
  }

  f(masterKey, ...args);
};
