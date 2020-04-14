#!/usr/bin/env node
const { program } = require("commander");
const { version } = require("../package.json");
const init = require("../actions/init");
const prefs = require("../actions/prefs");

program.version(version);

program
  .command("init")
  .description("initialize harpocrates")
  .option("-d, --defaults", "use defaults", false)
  .action(init);
program.command("master", "manage master key");
program
  .command("prefs")
  .description("change harpocrates preferences")
  .option("-d, --defaults", "use defaults", false)
  .action(prefs);
program.command("secret", "manage secrets");
program.command("store", "manage store");

program.parse(process.argv);
