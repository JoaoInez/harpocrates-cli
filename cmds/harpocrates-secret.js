const { program } = require("commander");
const { set, get } = require("../actions/secret");

program
  .command("set <name>")
  .description("set secret named <name>")
  .action(set);

program
  .command("get <name>")
  .description("get secret named <name>")
  .action(get);

program.parse(process.argv);
