const { program } = require("commander");
const { set, get, list } = require("../actions/secret");

program
  .command("set <name>")
  .description("set secret named <name>")
  .action(set);

program
  .command("get [name]")
  .description("get secret named [name]")
  .action(get);

program.command("list").description("list all secret names").action(list);

program.parse(process.argv);
