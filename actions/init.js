const signale = require("signale");
const chalk = require("chalk");
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
} = require("../utils/questions");
const { signaleAbort, signaleFatal } = require("../utils/signales");

module.exports = async ({ defaults }) => {
  try {
    const path = secretsPath();

    if (fs.existsSync(path)) {
      signale.fatal("Found a secrets file in this computer!");
      signale.info(
        `If you want to change your master key run ${chalk.blue(
          "$ harpocrates master change"
        )}`
      );
      signale.info(
        `If you want to delete the current secrets file and set a new master key run ${chalk.blue(
          "$ harpocrates master delete"
        )} and ${chalk.blue("$ harporcrates init")}`
      );
      return;
    }

    const { masterKey, __cancelled__: __masterKey__ } = await prompts(
      typeMasterKeyQ
    );

    if (__masterKey__) return signaleAbort();

    const { __cancelled__: __confirmMasterKey__ } = await prompts(
      confirmMasterKeyQ(masterKey, "Master keys don't match")
    );

    if (__confirmMasterKey__) return signaleAbort();

    initSecrets(masterKey);
    initPrefs();

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
      const {
        prefsMasterKey,
        __cancelled__: __prefsMasterKey__,
      } = await prompts(rememberMasterKeyQ);

      if (__prefsMasterKey__) return signaleAbort();

      initPrefs({
        masterKey: prefsMasterKey ? masterKey : false,
        secretViewMode,
        secretSetType,
        copyToClipboard,
      });
    }

    signale.success("Harpocrates initialized!");
  } catch (error) {
    signaleFatal();
  }
};
