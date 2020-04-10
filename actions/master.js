const signale = require("signale");
const fs = require("fs");
const { confPath } = require("../lib/secretsManager");
const { auth } = require("../utils/auth");
const prompts = require("../utils/prompts");
const { confirmQ } = require("../utils/questions");
const { signaleAbort } = require("../utils/signales");

exports.change = () => {}; //TODO

exports.remove = auth(async () => {
  if (!fs.existsSync(confPath()))
    return signale.fatal("Didn't find a secrets file in this computer!");

  signale.warn("This will delete your secrets file!");
  const { confirm, __cancelled__ } = await prompts(confirmQ);

  if (__cancelled__ || !confirm) return signaleAbort();

  fs.unlinkSync(confPath());

  signale.success("Secrets file deleted!");
});
