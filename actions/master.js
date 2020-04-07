const prompts = require("prompts");
const signale = require("signale");
const chalk = require("chalk");
const fs = require("fs");
const { initConf, confPath } = require("../lib/secretManager");

exports.set = async () => {
  const path = confPath();

  if (fs.existsSync(path)) {
    signale.fatal("Found a secrets file in this computer!");
    signale.info(
      `If you want to change your master key run ${chalk.blue(
        "$ harpocrates master change"
      )}`
    );
    return signale.info(
      `If you want to delete the current secrets file and set a new master key run ${chalk.blue(
        "$ harpocrates master delete"
      )} and ${chalk.blue("$ harporcrates master set")}`
    );
  }

  const { masterKey } = await prompts({
    type: "password",
    name: "masterKey",
    message: "Type your master key",
    validate: (value) => (value === "" ? "Cannot be empty" : true),
  });

  if (!masterKey) {
    return signale.fatal("Aborted!");
  }

  const { confirmMasterKey } = await prompts({
    type: "password",
    name: "confirmMasterKey",
    message: "Confirm your master key",
    validate: (value) =>
      value !== masterKey ? "Master keys don't match" : true,
  });

  if (!confirmMasterKey) {
    return signale.fatal("Aborted!");
  }

  initConf(masterKey);

  signale.success("Master key set!");
};

exports.change = () => {};

exports.remove = () => {};
