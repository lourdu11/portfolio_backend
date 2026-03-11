const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb+srv://SproutsOrgs:SproutsOrgs12345@cluster0.1i9dtge.mongodb.net/portfolio?retryWrites=true&w=majority&appName=Cluster0'
        );
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
