#!/usr/bin/env node
const { program } = require("commander");
const { version } = require("../package.json");

program.version(version);

program.command("master", "Manage master key");
program.command("secret", "Manage secrets");

program.parse(process.argv);
