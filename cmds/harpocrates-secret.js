const { program } = require("commander");
const { set, get } = require("../actions/secret");

program
  .command("set <name>")
  .description("Set secret named <name>")
  .action(set);

program
  .command("get <name>")
  .description("Get secret named <name>")
  .action(get);

program.parse(process.argv);
