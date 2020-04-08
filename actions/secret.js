const signale = require("signale");
const chalk = require("chalk");
const { setSecret, getSecret } = require("../lib/secretsManager");
const { getSecretViewMode } = require("../lib/prefsManager");
const { auth } = require("../utils/auth");
const prompts = require("../utils/prompts");
const { setSecretQ } = require("../utils/questions");
const { signaleAbort } = require("../utils/signales");

exports.set = auth(async (masterKey, name) => {
  const { secret, __cancelled__ } = await prompts(setSecretQ);

  if (__cancelled__) return signaleAbort();

  setSecret(name, secret)(masterKey);

  signale.success("Secret set!");
});

exports.get = auth((masterKey, name) => {
  const secret = getSecret(name)(masterKey);

  if (!secret) return signale.fatal("Not secret found!");

  if (getSecretViewMode() === "invisible") {
    signale.success(chalk.bgBlack.black.hidden(secret));
  } else {
    signale.success(secret);
  }
});
