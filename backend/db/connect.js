const dotenv = require('dotenv');
dotenv.config();
const { MongoClient } = require('mongodb');

let _db;

const initDb = (callback) => {
  if (_db) {
    console.log('Database is already initialized!');
    return callback(null, _db);
  }

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    return callback(new Error('MONGODB_URI is not defined.'));
  }

  MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((client) => {
      _db = client.db(); // Use the default database from the connection string
      console.log('Connected to MongoDB!');
      callback(null, _db);
    })
    .catch((err) => {
      console.error('Error connecting to MongoDB:', err);
      callback(err);
    });
};

const getDb = () => {
  if (!_db) {
    throw new Error('Database not initialized');
  }
  return _db; // Return the database object instead of the client
};

module.exports = { initDb, getDb };
