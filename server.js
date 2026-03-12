const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const contactRoutes = require("./routes/contactRoutes");

// Load environment variables
dotenv.config();

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request Logging Middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Health Check Route
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    message: "Backend is healthy",
    timestamp: new Date()
  });
});

// Root Route
app.get("/", (req, res) => {
  res.send("Portfolio Backend API is running...");
});

// API Routes
app.use("/api/contact", contactRoutes);

// Port
const PORT = process.env.PORT || 5000;

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});