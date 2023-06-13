const contacts = require("./contacts");

const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const allContacts = await contacts.listContacts();
      return console.table(allContacts);
    case "get":
      const contactById = await contacts.getContactById(id);
      return console.table(contactById);
    case "add":
      const newContact = await contacts.addContact({ name, email, phone });
      console.log(
        `Contact with name: ${name}, email: ${email}, phone: ${phone} has been added`
      );
      return console.table(newContact);
    case "remove":
      const removeContact = await contacts.removeContact(id);
      console.log(`Contact with id ${id} has been deleted`);
      return console.table(removeContact);
    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

invokeAction(argv);
