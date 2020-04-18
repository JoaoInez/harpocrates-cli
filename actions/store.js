const { writeFileSync, readFileSync } = require("../lib/fileManager");
const {
  getAllSecrets,
  setConf,
  hasSecret,
  setSecret,
} = require("../lib/secretsManager");
const { encrypt, decrypt } = require("../lib/cryptrManager");
const auth = require("../utils/auth");
const { success } = require("../utils/signales");

exports.backup = auth(
  async (masterKey, filename, folderPath, { decrypted, encryptionKey }) => {
    const secrets = getAllSecrets(masterKey);
    const data = decrypted
      ? JSON.stringify(secrets)
      : encrypt(JSON.stringify(secrets))(encryptionKey || masterKey);

    writeFileSync(
      `${folderPath}/${filename}.${!decrypted ? "txt" : "json"}`,
      data
    );

    success.secretsBackedUp();
  }
);

exports.importStore = auth(
  async (
    masterKey,
    filePath,
    { decrypted, encryptionKey, override, replace }
  ) => {
    const data = readFileSync(filePath, "utf8");
    const secrets = decrypted
      ? JSON.parse(data)
      : JSON.parse(decrypt(data)(encryptionKey || masterKey));

    if (!secrets.hasOwnProperty("secrets"))
      throw new Error("FILE_INCOMPATIBLE");

    if (!replace) {
      Object.entries(secrets.secrets).forEach(([key, value]) => {
        if (!override) {
          if (!hasSecret(key)(masterKey)) setSecret(key, value)(masterKey);
        } else setSecret(key, value)(masterKey);
      });
    } else setConf(masterKey, secrets);

    success.secretsBackedUp();
  }
);
