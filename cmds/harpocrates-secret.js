const { program } = require("commander");
const { set, get, list, remove, change } = require("../actions/secret");

program
  .command("set <name>")
  .description("set secret named <name>")
  .action(set);

program
  .command("get [name]")
  .description("get secret named [name]")
  .action(get);

program
  .command("delete [name]")
  .description("delete secret named [name]")
  .action(remove);

program
  .command("change <oldName> <newName>")
  .description("change secret <oldName> to <newName>")
  .action(change);

program.command("list").description("list all secret names").action(list);

program.parse(process.argv);
