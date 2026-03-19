const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

// ======================
// 🔹 MIDDLEWARE
// ======================
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ======================
// 🔹 LOGGING
// ======================
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// ======================
// 🔹 DATABASE CONNECTION
// ======================
const MONGO_URI = "YOUR_MONGODB_ATLAS_URL"; // 👈 paste your MongoDB URL here

mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ DB Error:", err));

// ======================
// 🔹 MODEL
// ======================
const Contact = mongoose.model("Contact", {
  name: String,
  email: String,
  message: String,
}, { timestamps: true });

// ======================
// 🔹 ROUTES
// ======================

// Root Route
app.get("/", (req, res) => {
  res.send("🚀 Portfolio Backend API is running...");
});

// Health Check
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    message: "Backend is healthy",
    time: new Date()
  });
});

// Contact Form API
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const newContact = new Contact({ name, email, message });
    await newContact.save();

    res.status(201).json({
      success: true,
      message: "Message saved successfully ✅"
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error ❌"
    });
  }
});

// ======================
// 🔹 PORT
// ======================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🔥 Server running on port ${PORT}`);
});