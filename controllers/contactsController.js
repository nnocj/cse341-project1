const { connectToDB } = require('../data/database');
const { ObjectId } = require('mongodb');

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

async function postContact(req, res) {
  try {
    const database = await connectToDB();
    const collection = database.collection('contacts');
    const newContact = req.body;
    const result = await collection.insertOne(newContact);
    res.status(201).json({ message: 'Contact created successfully', result });
  } catch (error) {
    console.error('Error creating contact:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function putContact(req,res) {
  const id = req.params.id;
  try {
    const database = await connectToDB();
    const collection = database.collection('contacts');
    const updatedContact = req.body;
    const result = await collection.updateOne(
      {_id: new ObjectId(id)},// Here I objectify the id to use it in the query
      { $set: updatedContact}// whiles here i replace the old contact bearing the same id with the new one
    )
   if (result.matchedCount === 0) {// the matchedCount is returned by MongoDB updateOne method
      return res.status(404).json({ error: 'Contact not found' });
    }
    res.json({ message: 'Contact updated successfully', result });
  } catch (error) {
    console.error('Error updating contact:', error);
    res.status(500).json({error: 'Internal Server Error'});
  }
}

async function deleteContact(req, res){
  const id = req.params.id;
  try {
    const database = await connectToDB();
    const collection = database.collection('contacts');
    const result = await collection.deleteOne({_id: new ObjectId(id)});
    if (result.deletedCount === 0) {// the deletedCount is returned by MongoDB deleteOne method
      return res.status(404).json({error: 'Contact not found'});
    }
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting contact:', error);
    res.status(500).json({error: 'Internal Server Error'});
  }
}

module.exports = { getAllContacts, getContactById, postContact, putContact, deleteContact };
