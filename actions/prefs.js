const signale = require("signale");
const { initConf } = require("../lib/prefsManager");
const { auth } = require("../utils/auth");
const prompts = require("../utils/prompts");
const { rememberMasterKeyQ, secretsPrefsQs } = require("../utils/questions");
const { signaleAbort } = require("../utils/signales");

module.exports = auth(async (masterKey, { defaults }) => {
  if (!defaults) {
    const {
      secretViewMode,
      secretSetType,
      copyToClipboard,
      __cancelled__: __secretPrefs__,
    } = await prompts(secretsPrefsQs);

    if (__secretPrefs__) return signaleAbort();

    signale.warn(
      "For more security remembering the master key is not recommended"
    );
    const { prefsMasterKey, __cancelled__: __prefsMasterKey__ } = await prompts(
      rememberMasterKeyQ
    );

    if (__prefsMasterKey__) return signaleAbort();

    initConf({
      masterKey: prefsMasterKey ? masterKey : false,
      secretViewMode,
      secretSetType,
      copyToClipboard,
    });
  } else {
    initConf();
  }
});
