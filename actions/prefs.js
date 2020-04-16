const { initConf } = require("../lib/prefsManager");
const auth = require("../utils/auth");
const prompts = require("../utils/prompts");
const { rememberMasterKeyQ, secretsPrefsQs } = require("../utils/questions");
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
    });
  } else initConf();

  success.prefsChanged();
});
