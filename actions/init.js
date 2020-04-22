const fs = require("fs");
const {
  initConf: initSecrets,
  confPath: secretsPath,
} = require("../lib/secretsManager");
const { initConf: initPrefs } = require("../lib/prefsManager");
const prompts = require("../utils/prompts");
const {
  typeMasterKeyQ,
  confirmMasterKeyQ,
  rememberMasterKeyQ,
  secretsPrefsQs,
  genPasswordPrefsQ,
} = require("../utils/questions");
const { warning, success } = require("../utils/signales");
const errorHandler = require("../utils/errorHandler");

module.exports = async ({ defaults }) => {
  try {
    const path = secretsPath();

    if (fs.existsSync(path)) throw new Error("SECRETS_FILE_ALREADY_EXISTS");

    const { masterKey, __cancelled__: __masterKey__ } = await prompts(
      typeMasterKeyQ
    );

    if (__masterKey__) throw new Error("ABORT");

    const { __cancelled__: __confirmMasterKey__ } = await prompts(
      confirmMasterKeyQ(masterKey)
    );

    if (__confirmMasterKey__) throw new Error("ABORT");

    initSecrets(masterKey);
    initPrefs();

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
      const {
        prefsMasterKey,
        __cancelled__: __prefsMasterKey__,
      } = await prompts(rememberMasterKeyQ);

      if (__prefsMasterKey__) throw new Error("ABORT");

      initPrefs({
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
    }

    success.harpocratesInitialized();
  } catch (error) {
    errorHandler(error);
  }
};
