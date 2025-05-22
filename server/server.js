const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

app.use(cors({
    origin: process.env.ALLOWED_ORIGINS ? 
        process.env.ALLOWED_ORIGINS.split(',') : 
        ['http://127.0.0.1:5500', 'http://localhost:5500'],
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
}));

app.use(bodyParser.json());

app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
    console.log('Request body:', req.body);
    next();
});

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/nexgen', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

mongoose.connection.on('error', err => {
    console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('MongoDB disconnected');
});

const ContactSchema = new mongoose.Schema({
    username: { type: String, required: true },
    userlastname: { type: String, required: true },
    email: { type: String, required: true },
    phonenumber: { type: String, required: true },
    usermessage: { type: String, required: true },
    date: { type: Date, default: Date.now }
});

const QuestionSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    question: { type: String, required: true },
    date: { type: Date, default: Date.now }
});

const Contact = mongoose.model('Contact', ContactSchema);
const Question = mongoose.model('Question', QuestionSchema);

app.post('/submit-contact', async (req, res) => {
    try {
        const { username, userlastname, email, phonenumber, usermessage } = req.body;
        
        if (!username || !userlastname || !email || !phonenumber || !usermessage) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const contact = new Contact(req.body);
        await contact.save();
        
        res.status(201).json({ 
            message: 'Contact form submitted successfully',
            data: contact
        });
    } catch (error) {
        console.error('Contact form error:', error);
        res.status(500).json({ error: 'Server error occurred' });
    }
});

app.post('/submit-question', async (req, res) => {
    try {
        const { name, email, question } = req.body;
        
        if (!name || !email || !question) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const questionDoc = new Question(req.body);
        await questionDoc.save();
        
        res.status(201).json({ 
            message: 'Question submitted successfully',
            data: questionDoc
        });
    } catch (error) {
        console.error('Question form error:', error);
        res.status(500).json({ error: 'Server error occurred' });
    }
});


app.use(express.static('public'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

process.on('unhandledRejection', (err) => {
    console.error('Unhandled promise rejection:', err);
});