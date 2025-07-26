const dotenv = require('dotenv');
dotenv.config();
const {MongoClient} = require('mongodb');
const uri = process.env.CONNECTION_STRING;
const client = new MongoClient(uri);

async function getAllContacts(req, res) {
    try {
      await client.connect();
      const database = this.client.db('cse-project1');
      const collection = database.collection('contacts');
      const contacts = await collection.find({}).toArray();
      res.json(contacts);
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } finally {
      await this.client.close();
    }
  }

async function getContactById(req, res) {
    const id = req.params.id;
    try {
      await client.connect();
      const database = client.db('cse-project1');
      const collection = database.collection('contacts');
      const contact = await collection.findOne({ _id: id });// I would have used ObjectId but its depreciated for now

      if (!contact) {
        return res.status(404).json({ error: 'Contact not found' });
      }

      res.json(contact);
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } finally {
      await this.client.close();
    }
  }

module.exports = {getAllContacts, getContactById};
