const signale = require("signale");
const chalk = require("chalk");

module.exports = {
  error: {
    abort: () => signale.fatal("Aborted!"),
    fatal: () => signale.fatal("Something went wrong!"),
    secretsFileAlreadyExists: () => {
      signale.fatal("Found a secrets file in this computer!");
      signale.info(
        `If you want to change your master key run ${chalk.blue(
          "$ harpocrates master change"
        )}`
      );
      signale.info(
        `If you want to delete the current secrets file and set a new master key run ${chalk.blue(
          "$ harpocrates master delete"
        )} and ${chalk.blue("$ harpocrates init")}`
      );
    },
    noMasterKey: () => {
      signale.fatal("No master key found!");
      signale.info("Run $ harpocrates init to create one.");
    },
    incorrectMasterKey: () => signale.fatal("Incorrect master key!"),
    noSecretsFileFound: () =>
      signale.fatal("Didn't find a secrets file in this computer!"),
    noSecretFound: () => signale.fatal("No secret found!"),
    noSecrets: () => signale.fatal("You have no secrets"),
    fileIncompatible: () => signale.fatal("File is incompatible!"),
    readFileFailed: () => signale.fatal("Couldn't read file"),
    writeFileFailed: () => signale.fatal("Couldn't write to file"),
    decryptFailed: () => signale.fatal("Couldnt decrypt"),
  },
  warning: {
    rememberMasterKey: () =>
      signale.warn(
        "For more security remembering the master key is not recommended"
      ),
    deleteSecretsFile: () =>
      signale.warn("This will delete your secrets file!"),
    cannotViewSecret: () => {
      signale.warn(
        "Secret view mode is set to none and copy to clipboard is set to false!"
      );
      signale.info("Run harpocrates prefs to change one of these settings.");
    },
    cannotViewSecrets: () => {
      signale.warn("Secret view mode is set to none!");
      signale.info("Run harpocrates prefs to change this setting.");
    },
    confirmDeleteSecret: (secret) =>
      signale.warn(`You are about to delete ${secret}`),
  },
  success: {
    harpocratesInitialized: () => signale.success("Harpocrates initialized!"),
    masterKeyChanged: () => signale.success("Master key changed!"),
    secretsFileDeleted: () => signale.success("Secrets file deleted!"),
    prefsChanged: () => signale.success("Preferences changed!"),
    secretSet: () => signale.success("Secret set!"),
    secretDeleted: () => signale.success("Secret deleted!"),
    secretChanged: () => signale.success("Secret changed!"),
    secretsBackedUp: () => signale.success("Secrets backed up!"),
    secretsImported: () => signale.success("Secrets imported!"),
    showSecret: (secret, hidden = false) =>
      hidden
        ? signale.success(chalk.bgBlack.black.hidden(secret))
        : signale.success(secret),
  },
};
