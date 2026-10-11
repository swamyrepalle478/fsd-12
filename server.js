require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5002;

app.use(cors());
app.use(express.json());
app.use('/api/tasks', require('./routes/tasks'));

app.get('/', (req, res) => {
    res.send('Welcome to the To-Do List API!');
});

app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

async function startServer() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected successfully');

        app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`);
        });
    } catch (err) {
        console.error('MongoDB connection error:', err.message);
        process.exit(1);
    }
}

startServer();
