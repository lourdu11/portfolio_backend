const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const contactRoutes = require('./routes/contactRoutes');

// Load environment variables
dotenv.config({ quiet: true });

const startServer = async () => {
    // Connect to Database
    await connectDB();

    const app = express();

    // Middleware
    app.use(cors());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));

    // Request Logging Middleware
    app.use((req, res, next) => {
        console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
        next();
    });

    // Health Check Route
    app.get('/health', (req, res) => {
        res.json({ status: 'OK', message: 'Backend is healthy', timestamp: new Date() });
    });

    // Root route
    app.get('/', (req, res) => {
        res.send('Portfolio Backend API is running... (Updated)');
    });

    // Routes
    app.use('/api/contact', contactRoutes);

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
};

startServer();
