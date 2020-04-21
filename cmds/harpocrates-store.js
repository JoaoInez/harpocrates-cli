const { program } = require("commander");
const { backup, importStore } = require("../actions/store");

program
  .command("backup <filename> <folderPath>")
  .option("-d, --decrypted", "backups up decrypted file", false)
  .option(
    "-ek, -k, --encryptionKey <key>",
    "encryption key for file (defaults to master key)",
    ""
  )
  .description("backs up secrets to <filename> in <folderPath>")
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
    "overrides existing secrets with backup secrets",
    false
  )
  .option("-r, --replace", "replaces secrets with file", false)
  .description("imports secrets from <filePath>")
  .action(importStore);

program.parse(process.argv);
