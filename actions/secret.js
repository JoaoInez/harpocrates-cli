const clipboardy = require("clipboardy");
const generator = require("generate-password");
const {
  setSecret,
  getSecret,
  deleteSecret,
  getAllSecrets,
  hasSecret,
} = require("../lib/secretsManager");
const {
  getSecretViewPrefs,
  getGenPasswordPrefs,
} = require("../lib/prefsManager");
const auth = require("../utils/auth");
const prompts = require("../utils/prompts");
const {
  setSecretNameQ,
  setSecretNameAutocompleteQ,
  setSecretQ,
  getSecretAutocompleteQ,
  getMultipleSecretsAutocompleteQ,
  confirmQ,
  deleteSecretAutocompleteQ,
  changeSecretAutocompleteQ,
  setNewSecretNameQ,
} = require("../utils/questions");
const { warning, success } = require("../utils/signales");

exports.set = auth(async (masterKey, name, secret, { search, genPassword }) => {
  const { copyToClipboard } = getSecretViewPrefs();

  const { name: _name, __cancelled__: __name__ } = name
    ? { name }
    : search
    ? await prompts(setSecretNameAutocompleteQ(masterKey))
    : await prompts(setSecretNameQ);

  if (__name__) throw new Error("ABORT");
  if (!_name) throw new Error("NO_SECRET_FOUND");

  const { secret: _secret, __cancelled__: __secret__ } = secret
    ? { secret }
    : genPassword
    ? { secret: generator.generate(getGenPasswordPrefs()) }
    : await prompts(setSecretQ);

  if (__secret__) throw new Error("ABORT");

  setSecret(_name, _secret)(masterKey);

  if (genPassword) success.showGeneratedPassword(_secret);
  success.secretSet();
  if (copyToClipboard) {
    clipboardy.writeSync(_secret);
    success.secretCopiedToClipboard();
  }
});

exports.get = auth(async (masterKey, name, { multiple }) => {
  const { secretViewMode, copyToClipboard } = getSecretViewPrefs();

  if (!multiple) {
    const { secret, __cancelled__ } = name
      ? { secret: getSecret(name)(masterKey) }
      : await prompts(getSecretAutocompleteQ(masterKey));

    if (__cancelled__) throw new Error("ABORT");
    if (!secret) throw new Error("NO_SECRET_FOUND");
    if (secretViewMode === "none" && !copyToClipboard)
      warning.cannotViewSecret();
    if (secretViewMode === "visible") success.showSecret(secret);
    if (secretViewMode === "invisible") success.showSecret(secret, true);
    if (copyToClipboard) {
      clipboardy.writeSync(secret);
      success.secretCopiedToClipboard();
    }
  } else {
    const { secrets, __cancelled__ } = await prompts(
      getMultipleSecretsAutocompleteQ(masterKey)
    );

    if (__cancelled__) throw new Error("ABORT");
    if (secretViewMode === "none") warning.cannotViewSecrets();

    secrets.forEach(({ name, secret }) => {
      if (secretViewMode === "visible")
        success.showSecret(`${name} -> ${secret}`);
      if (secretViewMode === "invisible")
        success.showSecret(`${name} -> ${secret}`, true);
    });
  }
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

exports.change = auth(async (masterKey, oldName, newName) => {
  const { oldName: _oldName, __cancelled__: __oldName__ } = oldName
    ? { oldName }
    : await prompts(changeSecretAutocompleteQ(masterKey));

  if (__oldName__) throw new Error("ABORT");

  const secret = getSecret(_oldName)(masterKey);

  if (!secret) throw new Error("NO_SECRET_FOUND");

  const { newName: _newName, __cancelled__: __newName__ } = newName
    ? { newName }
    : await prompts(setNewSecretNameQ);

  if (__newName__) throw new Error("ABORT");

  setSecret(_newName, secret)(masterKey);
  deleteSecret(_oldName)(masterKey);
  success.secretChanged();
});

exports.list = auth(async (masterKey, { showSecrets }) => {
  const secrets = Object.entries(getAllSecrets(masterKey).secrets);

  if (!secrets.length) throw new Error("NO_SECRETS");

  secrets.map(([name, secret]) =>
    success.showSecret(!showSecrets ? secret : `${name} -> ${secret}`)
  );
});
