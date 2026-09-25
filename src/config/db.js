const mongoose = require("mongoose");

function connectDB() {
    try {
        mongoose.connect("mongodb+srv://admin:KZ2dJj0RfUq0Pqh9@youtubecomletebackend.wwsiyij.mongodb.net/?appName=youtubecomletebackend");
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}

module.exports = connectDB;