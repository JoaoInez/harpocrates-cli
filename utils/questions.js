const { getSecretSetType } = require("../lib/prefsManager");
const { getAllSecrets } = require("../lib/secretsManager");
const { notEmpty, noMatch } = require("./validation");

exports.enterMasterKeyQ = {
  type: "invisible",
  name: "masterKey",
  message: "Enter master key",
  validate: notEmpty,
};

exports.typeMasterKeyQ = {
  type: "password",
  name: "masterKey",
  message: "Type your master key",
  validate: notEmpty,
};

exports.newMasterKeyQ = {
  type: "password",
  name: "masterKey",
  message: "Type your new master key",
  validate: notEmpty,
};

exports.confirmMasterKeyQ = (masterKey) => ({
  type: "password",
  name: "confirmMasterKey",
  message: "Confirm your master key",
  validate: noMatch(masterKey, "Master keys don't match"),
});

exports.rememberMasterKeyQ = {
  type: "confirm",
  name: "prefsMasterKey",
  message: "Remember master key?",
  initial: false,
};

exports.secretsPrefsQs = [
  {
    type: "select",
    name: "secretViewMode",
    message: "Default secret viewing mode",
    choices: [
      {
        title: "visible",
        value: "visible",
      },
      {
        title: "invisible",
        value: "invisible",
      },
      {
        title: "none",
        value: "none",
      },
    ],
    initial: 0,
  },
  {
    type: "select",
    name: "secretSetType",
    message: "Default secret typing mode",
    choices: [
      {
        title: "text",
        value: "text",
      },
      {
        title: "password",
        value: "password",
      },
      {
        title: "invisible",
        value: "invisible",
      },
    ],
    initial: 0,
  },
  {
    type: "confirm",
    name: "copyToClipboard",
    message: "Automatically copy secret to clipboard?",
    initial: true,
  },
];

exports.genPasswordPrefsQ = [
  {
    type: "number",
    name: "length",
    message: "Password length",
    initial: 16,
    style: "default",
  },
  {
    type: "confirm",
    name: "numbers",
    message: "Put numbers in password?",
    initial: true,
  },
  {
    type: "confirm",
    name: "symbols",
    message: "Put symbols in password?",
    initial: true,
  },
  {
    type: "confirm",
    name: "lowercase",
    message: "Put lowercase in password?",
    initial: true,
  },
  {
    type: "confirm",
    name: "uppercase",
    message: "Put uppercase in password?",
    initial: true,
  },
  {
    type: "confirm",
    name: "excludeSimilarCharacters",
    message: `Exclude similar characters? (Example: "i" and "l")`,
    initial: false,
  },
  {
    type: "text",
    name: "exclude",
    message: "Characters to be exluded",
    initial: "",
  },
  {
    type: "confirm",
    name: "strict",
    message: "Password must include at least one character from each pool",
    initial: true,
  },
];

exports.confirmQ = {
  type: "confirm",
  name: "confirm",
  message: "Are you sure?",
  initial: false,
};

exports.setSecretNameQ = {
  type: "text",
  name: "name",
  message: "What is the secret's name:",
  validate: notEmpty,
};

exports.setSecretNameAutocompleteQ = (masterKey) => ({
  type: "autocomplete",
  name: "name",
  message: "Pick the secret",
  choices: Object.keys(getAllSecrets(masterKey).secrets).map((secret) => ({
    title: secret,
  })),
});

exports.setSecretQ = {
  type: getSecretSetType,
  name: "secret",
  message: "Tell me a secret",
  validate: notEmpty,
};

exports.getSecretAutocompleteQ = (masterKey) => ({
  type: "autocomplete",
  name: "secret",
  message: "Pick the secret",
  choices: Object.entries(getAllSecrets(masterKey).secrets).map(
    ([key, value]) => ({
      title: key,
      value,
    })
  ),
});

exports.getMultipleSecretsAutocompleteQ = (masterKey) => ({
  type: "multiselect",
  name: "secrets",
  message: "Pick the secrets",
  choices: Object.entries(getAllSecrets(masterKey).secrets).map(
    ([key, value]) => ({
      title: key,
      value: { name: key, secret: value },
    })
  ),
  min: 1,
  instructions: false,
});

exports.deleteSecretAutocompleteQ = (masterKey) => ({
  type: "autocomplete",
  name: "secret",
  message: "Pick the secret",
  choices: Object.keys(getAllSecrets(masterKey).secrets).map((secret) => ({
    title: secret,
  })),
});

exports.changeSecretAutocompleteQ = (masterKey) => ({
  type: "autocomplete",
  name: "oldName",
  message: "Pick the secret",
  choices: Object.keys(getAllSecrets(masterKey).secrets).map((secret) => ({
    title: secret,
  })),
});

exports.setNewSecretNameQ = {
  type: "text",
  name: "newName",
  message: "Enter new secret name:",
  validate: notEmpty,
};
