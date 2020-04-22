const { program } = require("commander");
const { backup, importStore } = require("../actions/store");

program
  .command("backup <folderPath> [filename]")
  .option("-d, --decrypted", "backups up decrypted file", false)
  .option(
    "-ek, -k, --encryptionKey <key>",
    "encryption key for file (defaults to master key)",
    ""
  )
  .description("backs up secrets to <folderPath>/[filename]")
  .action(backup);
program
  .command("import <filePath>")
  .option("-d, --decrypted", "imports decrypted file", false)
  .option(
    "-ek, -k, --encryptionKey <key>",
    "encryption key for file (defaults to master key)",
    ""
  )
  .option(
    "-o, --override",
    "in case of conflit a secret is overwritten by the backup secret",
    false
  )
  .option("-r, --replace", "replaces secrets with file", false)
  .description("imports secrets from <filePath>")
  .action(importStore);

program.parse(process.argv);
