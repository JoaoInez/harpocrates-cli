const signale = require("signale");
const fs = require("fs");
const { confPath, getAllSecrets, setConf } = require("../lib/secretsManager");
const { getMasterKey, setMasterKey } = require("../lib/prefsManager");
const { auth } = require("../utils/auth");
const prompts = require("../utils/prompts");
const {
  confirmQ,
  newMasterKeyQ,
  confirmMasterKeyQ,
} = require("../utils/questions");
const { signaleAbort } = require("../utils/signales");

exports.change = auth(async (oldMasterKey) => {
  const { masterKey, __cancelled__: __masterKey__ } = await prompts(
    newMasterKeyQ
  );

  if (__masterKey__) return signaleAbort();

  const { __cancelled__: __confirmMasterKey__ } = await prompts(
    confirmMasterKeyQ(masterKey, "Master keys don't match")
  );

  if (__confirmMasterKey__) return signaleAbort();

  const store = getAllSecrets(oldMasterKey);
  const prefsMasterKey = getMasterKey();

  setConf(masterKey, store);

  if (prefsMasterKey) setMasterKey(masterKey);

  signale.success("Master key changed!");
});

exports.remove = auth(async () => {
  if (!fs.existsSync(confPath()))
    return signale.fatal("Didn't find a secrets file in this computer!");

  signale.warn("This will delete your secrets file!");
  const { confirm, __cancelled__ } = await prompts(confirmQ);

  if (__cancelled__ || !confirm) return signaleAbort();

  fs.unlinkSync(confPath());

  signale.success("Secrets file deleted!");
});
