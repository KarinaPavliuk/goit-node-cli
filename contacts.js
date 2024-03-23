const fs = require("node:fs/promises");
const path = require("node:path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(process.cwd(), 'contacts.json'); 

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const result = contacts.find(item => item.id === contactId);
  return result || null;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
    const index = contacts.findIndex(item => item.id === contactId);
    if(index === -1){
        return null;
    }
    const [result] = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return result;
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
    const newContact = {
      id: nanoid(),
      name,
      email,
      phone,
    }
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
}

//--------------ВАРІАНТ З КЛАСОМ------------------------------

// class ContactsRepository {
//   contactsPath = path.join(process.cwd(), 'contacts.json');

//   async getContacts() {
//     const contacts = await fs.readFile(this.contactsPath);
//     const entries = JSON.parse(contacts.toString());
//     return entries;
//   }

//   async getById(id) {
//     const contacts = await this.getContacts();
//     const result = contacts.find(item => item.id === id);
//     return result || null;
//   }

//   async addContact(data) {
//     const contacts = await this.getContacts();
//      const newContact = {
//         id: nanoid(),
//         ...data,
//     }
//     contacts.push(newContact);
//     await fs.writeFile(this.contactsPath, JSON.stringify(contacts, null, 2));
//     return newContact;
//   }

//   async updateById(id, data) {
//     const contacts = await this.getContacts();
//     const index = contacts.findIndex(item => item.id === id);
//     if (index === -1){
//         return null;
//     }
//     contacts[index] = { id, ...data };
//     await fs.writeFile(this.contactsPath, JSON.stringify(contacts, null, 2));
//     return contacts[index];
//   }

//   async deleteById(id) {
//     const contacts = await this.getContacts();
//     const index = contacts.findIndex(item => item.id === id);
//     if (index === -1){
//         return null;
//     }
//     const [result] = contacts.splice(index, 1);
//     await fs.writeFile(this.contactsPath, JSON.stringify(contacts, null, 2));
//     return result;
//   }

// }

// const contactsRepository = new ContactsRepository;

// module.exports = contactsRepository;