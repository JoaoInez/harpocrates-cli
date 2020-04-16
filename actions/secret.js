const clipboardy = require("clipboardy");
const {
  setSecret,
  getSecret,
  deleteSecret,
  getAllSecrets,
  hasSecret,
} = require("../lib/secretsManager");
const { getSecretViewPrefs } = require("../lib/prefsManager");
const auth = require("../utils/auth");
const prompts = require("../utils/prompts");
const {
  setSecretQ,
  getSecretAutocompleteQ,
  confirmQ,
  deleteSecretAutocompleteQ,
} = require("../utils/questions");
const { warning, success } = require("../utils/signales");

// TODO: more options for get, set and list

exports.set = auth(async (masterKey, name) => {
  const { secret, __cancelled__ } = await prompts(setSecretQ);

  if (__cancelled__) throw new Error("ABORT");

  setSecret(name, secret)(masterKey);

  success.secretSet();
});

exports.get = auth(async (masterKey, name) => {
  const { secret } = name
    ? { secret: getSecret(name)(masterKey) }
    : await prompts(getSecretAutocompleteQ(masterKey));

  if (!secret) throw new Error("NO_SECRET_FOUND");

  const { secretViewMode, copyToClipboard } = getSecretViewPrefs();

  if (secretViewMode === "none" && !copyToClipboard) warning.cannotViewSecret();
  if (copyToClipboard) clipboardy.writeSync(secret);
  if (secretViewMode === "visible") success.showSecret(secret);
  if (secretViewMode === "invisible") success.showSecret(secret, true);
});

exports.remove = auth(async (masterKey, name) => {
  const { secret, __cancelled__: __secret__ } = name
    ? { secret: name }
    : await prompts(deleteSecretAutocompleteQ(masterKey));

  if (__secret__) throw new Error("ABORT");
  if (!hasSecret(secret)(masterKey)) throw new Error("NO_SECRET_FOUND");

  warning.confirmDeleteSecret(secret);
  const { confirm, __cancelled__: __confirm__ } = await prompts(confirmQ);

  if (__confirm__) throw new Error("ABORT");
  if (!confirm) return;

  deleteSecret(secret)(masterKey);
  success.secretDeleted();
});

exports.change = auth((masterKey, oldName, newName) => {
  const secret = getSecret(oldName)(masterKey);

  if (!secret) throw new Error("NO_SECRET_FOUND");

  setSecret(newName, secret)(masterKey);
  deleteSecret(oldName)(masterKey);
  success.secretChanged();
});

exports.list = auth((masterKey) => {
  const secrets = Object.keys(getAllSecrets(masterKey).secrets);

  if (!secrets.length) throw new Error("NO_SECRETS");

  secrets.map((secret) => success.showSecret(secret));
});
