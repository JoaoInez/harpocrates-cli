const { program } = require("commander");
const { set, get, list, remove, change } = require("../actions/secret");

program
  .command("set [name] [secret]")
  .option("-s, --search", "search for an existing secret", false)
  .option("-gen, --gen-password", "generate password", false)
  .description("set secret [secret] named [name]")
  .action(set);

program
  .command("get [name]")
  .option("-m, --multiple", "get multiple secrets", false)
  .description("get secret named [name]")
  .action(get);

program
  .command("delete [name]")
  .description("delete secret named [name]")
  .action(remove);

program
  .command("change [oldName] [newName]")
  .description("change secret [oldName] to [newName]")
  .action(change);

program
  .command("list")
  .option("-s, --show-secrets", "list all secrets contents", false)
  .description("list all secret names")
  .action(list);

program.parse(process.argv);
