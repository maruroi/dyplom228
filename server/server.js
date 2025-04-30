const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors({
    origin: ['http://127.0.0.1:5500', 'http://localhost:5500'],
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
}));
app.use(bodyParser.json());

// Add route debugging
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
});

// Add path logging middleware
app.use((req, res, next) => {
    console.log('Request path:', req.path);
    console.log('Request body:', req.body);
    next();
});

mongoose.connect('mongodb://localhost:27017/nexgen', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Contact form schema
const ContactSchema = new mongoose.Schema({
    username: String,
    userlastname: String,
    email: String,
    phonenumber: String,
    usermessage: String,
    date: { type: Date, default: Date.now }
});

// Question form schema
const QuestionSchema = new mongoose.Schema({
    name: String,
    email: String,
    question: String,
    date: { type: Date, default: Date.now }
});

const Contact = mongoose.model('Contact', ContactSchema);
const Question = mongoose.model('Question', QuestionSchema);

app.post('/submit-contact', async (req, res) => {
    try {
        console.log('Contact form data received:', req.body);
        const contact = new Contact(req.body);
        await contact.save();
        res.json({ message: 'Contact form submitted successfully' });
    } catch (error) {
        console.error('Contact form error:', error);
        res.status(500).json({ error: error.message });
    }
});

app.post('/submit-question', async (req, res) => {
    try {
        console.log('Question form data received:', req.body);
        const question = new Question(req.body);
        await question.save();
        res.json({ message: 'Question submitted successfully' });
    } catch (error) {
        console.error('Question form error:', error);
        res.status(500).json({ error: error.message });
    }
});

app.use(express.static('public'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
