const signale = require("signale");
const chalk = require("chalk");
const clipboardy = require("clipboardy");
const {
  setSecret,
  getSecret,
  getAllSecrets,
} = require("../lib/secretsManager");
const { getSecretViewPrefs } = require("../lib/prefsManager");
const { auth } = require("../utils/auth");
const prompts = require("../utils/prompts");
const { setSecretQ, getSecretAutocompleteQ } = require("../utils/questions");
const { signaleAbort } = require("../utils/signales");

exports.set = auth(async (masterKey, name) => {
  const { secret, __cancelled__ } = await prompts(setSecretQ);

  if (__cancelled__) return signaleAbort();

  setSecret(name, secret)(masterKey);

  signale.success("Secret set!");
});

exports.get = auth(async (masterKey, name) => {
  const { secret } = name
    ? { secret: getSecret(name)(masterKey) }
    : await prompts(getSecretAutocompleteQ(masterKey));

  if (!secret) return signale.fatal("Not secret found!");

  const { secretViewMode, copyToClipboard } = getSecretViewPrefs();

  if (secretViewMode === "none" && !copyToClipboard) {
    signale.warn(
      "Secret view mode is set to none and copy to clipboard is set to false!"
    );
    signale.info("Run harpocrates prefs to change one of these settings.");
  }

  if (copyToClipboard) clipboardy.writeSync(secret);
  if (secretViewMode === "visible") signale.success(secret);
  if (secretViewMode === "invisible")
    signale.success(chalk.bgBlack.black.hidden(secret));
});

exports.list = auth((masterKey) => {
  const { secrets } = getAllSecrets(masterKey);
  Object.keys(secrets).map((secret) => signale.success(secret));
});
