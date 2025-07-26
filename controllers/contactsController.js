import { connectToDB } from "../data/database";

async function getAllContacts(req, res) {
  try {
    const database = await connectToDB();
    const collection = database.collection('contacts');
    const contacts = await collection.find({}).toArray();
    res.json(contacts);
  } catch (error) {
    console.error('Error getting contacts:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function getContactById(req, res) {
  const id = req.params.id;
  try {
    const database = await connectToDB();
    const collection = database.collection('contacts');
    const contact = await collection.findOne({ _id: id});

    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    res.json(contact);
  } catch (error) {
    console.error('Error getting contact by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = { getAllContacts, getContactById };
