const mongoose = require("mongoose");
require("dotenv").config();

console.log("URI is ", process.env.MONGODB_URI);

const MONGODB_URI = process.env.MONGODB_URI; // || "mongodb://localhost:27017/us-spatial-data";
console.log("URI", MONGODB_URI);

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
