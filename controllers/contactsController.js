const dotenv = require('dotenv');
dotenv.config();

const { MongoClient, ObjectId } = require('mongodb');

const uri = process.env.CONNECTION_STRING;

// Create the client ONCE
const client = new MongoClient(uri);

// Reuse the same DB instance
let db;

async function connectToDB() {
  if (!db) {
    await client.connect();
    db = client.db('cse-project1');
  }
  return db;
}

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
    const contact = await collection.findOne({ _id: new ObjectId(id) });

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
