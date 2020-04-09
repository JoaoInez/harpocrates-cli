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

exports.confirmMasterKeyQ = (masterKey, message) => ({
  type: "password",
  name: "confirmMasterKey",
  message: "Confirm your master key",
  validate: noMatch(masterKey, message),
});

exports.rememberMasterKeyQ = [
  {
    type: "confirm",
    name: "prefsMasterKey",
    message: "Remember master key?",
    initial: false,
  },
];

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
        title: "password",
        value: "password",
      },
      {
        title: "text",
        value: "text",
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

exports.confirmQ = [
  {
    type: "confirm",
    name: "confirm",
    message: "Are you sure?",
    initial: false,
  },
];

exports.setSecretQ = [
  {
    type: getSecretSetType,
    name: "secret",
    message: "Tell me a secret",
    validate: notEmpty,
  },
];

exports.getSecretAutocompleteQ = (masterKey) => [
  {
    type: "autocomplete",
    name: "secret",
    message: "Pick the secret",
    choices: Object.entries(getAllSecrets(masterKey).secrets).map(
      ([key, value]) => ({
        title: key,
        value,
      })
    ),
  },
];
