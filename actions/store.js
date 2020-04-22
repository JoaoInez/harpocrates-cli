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
  async (masterKey, folderPath, filename, { decrypted, encryptionKey }) => {
    const secrets = getAllSecrets(masterKey).secrets;

    const data = decrypted
      ? JSON.stringify(secrets)
      : encrypt(JSON.stringify(secrets))(encryptionKey || masterKey);

    writeFileSync(
      `${folderPath}/${filename || "harpocrates_backup"}.${
        !decrypted ? "txt" : "json"
      }`,
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

    if (!replace) {
      Object.entries(secrets).forEach(([key, value]) => {
        if (!override) {
          if (!hasSecret(key)(masterKey)) setSecret(key, value)(masterKey);
        } else setSecret(key, value)(masterKey);
      });
    } else setConf(masterKey, { secrets: secrets });

    success.secretsBackedUp();
  }
);
