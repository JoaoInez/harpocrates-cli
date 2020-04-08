const { program } = require("commander");
const { change, remove } = require("../actions/master");

program.command("change").description("change master key").action(change);
program
  .command("delete")
  .description("delete master key and secrets file")
  .action(remove);

program.parse(process.argv);
