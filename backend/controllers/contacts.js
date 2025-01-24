const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  try {
    const db = mongodb.getDb();
    const result = await db.collection('contacts').find().toArray();

    res.status(200).json(result);
  } catch (err) {
    console.error('Error fetching contacts:', err);
    res.status(500).json({ message: 'Error fetching contacts' });
  }
};


const getSingle = async (req, res) => {
  try {
    const db = mongodb.getDb();
    const userId = new ObjectId(req.params.id);
    const result = await db.collection('contacts').findOne({ _id: userId });

    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: 'Contact not found' });
    }
  } catch (err) {
    console.error('Error fetching contact:', err);
    res.status(500).json({ message: 'Error fetching contact' });
  }
};


const createContact = async (req, res) => {
  try {
    const db = mongodb.getDb();
    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday,
    };
    const response = await db.collection('contacts').insertOne(contact);

    if (response.acknowledged) {
      res.status(201).json({ message: 'Contact created successfully!', id: response.insertedId });
    } else {
      res.status(500).json({ message: 'Failed to create contact.' });
    }
  } catch (err) {
    console.error('Error creating contact:', err);
    res.status(500).json({ message: 'An error occurred while creating the contact.' });
  }
};


const updateContact = async (req, res) => {
  try {
    const db = mongodb.getDb();
    const contactId = new ObjectId(req.params.id);
    const updatedContact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday,
    };

    const response = await db
      .collection('contacts')
      .updateOne({ _id: contactId }, { $set: updatedContact });

    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'No contact found to update.' });
    }
  } catch (err) {
    console.error('Error updating contact:', err);
    res.status(500).json({ message: 'An error occurred while updating the contact.' });
  }
};


const deleteContact = async (req, res) => {
  try {
    const db = mongodb.getDb();
    const userId = new ObjectId(req.params.id);

    const response = await db.collection('contacts').deleteOne({ _id: userId });

    if (response.deletedCount > 0) {
      res.status(200).json({ message: 'Contact deleted successfully!' });
    } else {
      res.status(404).json({ message: 'No contact found to delete.' });
    }
  } catch (err) {
    console.error('Error deleting contact:', err);
    res.status(500).json({ message: 'An error occurred while deleting the contact.' });
  }
};


module.exports = {
  getAll,
  getSingle,
  createContact,
  updateContact,
  deleteContact
};
