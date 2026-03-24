// =======================
// 📦 IMPORTS
// =======================
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// =======================
// 🚀 APP INIT
// =======================
const app = express();

// =======================
// 🔧 MIDDLEWARE
// =======================
app.use(cors());
app.use(express.json());

// =======================
// 🌐 PORT
// =======================
const PORT = process.env.PORT || 5000;

// =======================
// 🔥 MONGODB CONNECTION
// =======================
if (!process.env.MONGO_URI) {
  console.error("❌ MONGO_URI is missing in .env file");
  process.exit(1);
}

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((err) => console.log("❌ MongoDB Connection Error:", err.message));

// =======================
// 📦 SCHEMA & MODEL
// =======================
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
}, { timestamps: true });

const Contact = mongoose.model("Contact", contactSchema);

// =======================
// 📩 ROUTES
// =======================

// Test route
app.get("/", (req, res) => {
  res.send("🚀 Backend is running...");
});

// Contact form route
app.post("/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Save to MongoDB
    const newContact = new Contact({ name, email, message });
    await newContact.save();

    res.status(200).json({
      success: true,
      message: "Message saved successfully",
    });

  } catch (error) {
    console.error("❌ Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

// =======================
// 🚀 START SERVER
// =======================
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});