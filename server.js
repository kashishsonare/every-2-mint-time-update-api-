const express = require('express');
const mongoose = require('mongoose');
const cron = require('node-cron');

const DataModel = require('../updatedataapi/src/models/DataModel');


const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = 'mongodb://127.0.0.1:27017/updatedata';

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Define a route to update data
app.get('/update', async (req, res) => {
    try {
        const newData = new DataModel();
        await newData.save();
        res.json({ message: 'Data updated successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Cron job to update data every 2 minutes
cron.schedule('*/2 * * * *', async () => {
    try {
        const newData = new DataModel();
        await newData.save();
        console.log('Data updated successfully');
    } catch (err) {
        console.error('Error updating data:', err);
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
