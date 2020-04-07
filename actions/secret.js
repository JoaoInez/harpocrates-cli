const prompts = require("prompts");
const signale = require("signale");
const { auth } = require("../utils/validation");
const { setSecret, getSecret } = require("../lib/secretManager");

exports.set = auth(async (masterKey, name) => {
  const { secret } = await prompts({
    name: "secret",
    type: "password",
    message: "Tell me a secret",
    validate: (value) => (value === "" ? "Cannot be empty" : true),
  });

  if (!secret) {
    return signale.fatal("Aborted!");
  }

  setSecret(masterKey)(name, secret);

  signale.success("Secret set!");
});

exports.get = auth((masterKey, name) => {
  const secret = getSecret(masterKey)(name);

  if (!secret) {
    return signale.fatal("Not secret found!");
  }

  signale.success(secret);
});
