#!/usr/bin/env node
const { program } = require("commander");
const { version } = require("../package.json");
const init = require("../actions/init");
const prefs = require("../actions/prefs");

program.version(version);

program
  .command("init")
  .description("initialize harpocrates")
  .option("-d, --defaults", "Use defaults", false)
  .action(init);
program.command("master", "Manage master key");
program
  .command("prefs")
  .description("change harpocrates preferences")
  .option("-d, --defaults", "Use defaults", false)
  .action(prefs);
program.command("secret", "manage secrets");

program.parse(process.argv);
