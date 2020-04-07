const { program } = require("commander");
const { set, change, remove } = require("../actions/master");

program.command("set").description("Set master key").action(set);
program.command("change").description("Change master key").action(change);
program
  .command("delete")
  .description("Delete master key and secrets file")
  .action(remove);

program.parse(process.argv);
