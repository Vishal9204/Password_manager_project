const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const { MongoClient } = require('mongodb');
require('dotenv').config();
const cors = require('cors');

app.use(cors());
app.use(bodyparser.json());

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'passwordsave';

// Connect to MongoDB
client.connect().then(() => {
    console.log('Connected successfully to MongoDB server');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

const port = 3000;

// Get all the passwords
app.get('/', async (req, res) => {
    try {
        const db = client.db(dbName);
        const collection = db.collection('passwords');
        const findResult = await collection.find({}).toArray();
        res.json(findResult);
    } catch (err) {
        console.error('Error retrieving passwords:', err);
        res.status(500).send({ success: false, message: 'Error retrieving passwords' });
    }
});

// Save a password
app.post('/', async (req, res) => {
    try {
        const password = req.body;
        if (Array.isArray(password) || typeof password !== 'object') {
            return res.status(400).send({ success: false, message: 'Invalid data format' });
        }
        const db = client.db(dbName);
        const collection = db.collection('passwords');
        const result = await collection.insertOne(password);
        res.send({ success: true, result });
    } catch (err) {
        console.error('Error saving password:', err);
        res.status(500).send({ success: false, message: 'Error saving password' });
    }
});

// Delete a password
app.delete('/', async (req, res) => {
    try {
        const { key } = req.body;
        if (!key) {
            return res.status(400).send({ success: false, message: 'Missing key for deletion' });
        }
        const db = client.db(dbName);
        const collection = db.collection('passwords');
        const result = await collection.deleteOne({ key });
        res.send({ success: true, result });
    } catch (err) {
        console.error('Error deleting password:', err);
        res.status(500).send({ success: false, message: 'Error deleting password' });
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
