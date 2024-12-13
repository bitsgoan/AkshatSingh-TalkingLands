const mongoose = require("mongoose");
const Point = require("../models/Point");
const connectDB = require("../config/database");

async function migrate() {
  try {
    await connectDB();
    console.log("Connected to database...");

    // Drop existing points collection if it exists
    await Point.collection.drop();
    console.log("Dropped existing points collection");

    // Create 2dsphere index
    await Point.collection.createIndex({ location: "2dsphere" });
    console.log("Created 2dsphere index");

    console.log("Migration completed successfully");
    process.exit(0);
  } catch (error) {
    console.error("Migration error:", error);
    process.exit(1);
  }
}

migrate();
