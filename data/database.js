const dotenv = require('dotenv');
dotenv.config();

const { MongoClient} = require('mongodb');

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


module.exports = { connectToDB };