const { initConf } = require("../lib/prefsManager");
const auth = require("../utils/auth");
const prompts = require("../utils/prompts");
const {
  rememberMasterKeyQ,
  secretsPrefsQs,
  genPasswordPrefsQ,
} = require("../utils/questions");
const { warning, success } = require("../utils/signales");

module.exports = auth(async (masterKey, { defaults }) => {
  if (!defaults) {
    const {
      secretViewMode,
      secretSetType,
      copyToClipboard,
      __cancelled__: __secretPrefs__,
    } = await prompts(secretsPrefsQs);

    if (__secretPrefs__) throw new Error("ABORT");

    const {
      length,
      numbers,
      symbols,
      lowercase,
      uppercase,
      excludeSimilarCharacters,
      exclude,
      strict,
      __cancelled__: __genPasswordPrefs__,
    } = await prompts(genPasswordPrefsQ);

    if (__genPasswordPrefs__) throw new Error("ABORT");

    warning.rememberMasterKey();
    const { prefsMasterKey, __cancelled__: __prefsMasterKey__ } = await prompts(
      rememberMasterKeyQ
    );

    if (__prefsMasterKey__) throw new Error("ABORT");

    initConf({
      masterKey: prefsMasterKey ? masterKey : false,
      secretViewMode,
      secretSetType,
      copyToClipboard,
      length,
      numbers,
      symbols,
      lowercase,
      uppercase,
      excludeSimilarCharacters,
      exclude,
      strict,
    });
  } else initConf();

  success.prefsChanged();
});
