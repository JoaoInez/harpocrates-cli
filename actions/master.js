const fs = require("fs");
const { confPath, getAllSecrets, setConf } = require("../lib/secretsManager");
const { getMasterKey, setMasterKey } = require("../lib/prefsManager");
const auth = require("../utils/auth");
const prompts = require("../utils/prompts");
const {
  confirmQ,
  newMasterKeyQ,
  confirmMasterKeyQ,
} = require("../utils/questions");
const { warning, success } = require("../utils/signales");

exports.change = auth(async (oldMasterKey) => {
  const { masterKey, __cancelled__: __masterKey__ } = await prompts(
    newMasterKeyQ
  );

  if (__masterKey__) throw new Error("ABORT");

  const { __cancelled__: __confirmMasterKey__ } = await prompts(
    confirmMasterKeyQ(masterKey)
  );

  if (__confirmMasterKey__) throw new Error("ABORT");

  const store = getAllSecrets(oldMasterKey);
  const prefsMasterKey = getMasterKey();

  setConf(masterKey, store);

  if (prefsMasterKey) setMasterKey(masterKey);

  success.masterKeyChanged();
});

exports.remove = auth(async () => {
  warning.deleteSecretsFile();
  const { confirm, __cancelled__ } = await prompts(confirmQ);

  if (__cancelled__) throw new Error("ABORT");
  if (!confirm) return;

  fs.unlinkSync(confPath());

  success.secretsFileDeleted();
});
