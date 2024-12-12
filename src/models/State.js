// src/models/State.js
const mongoose = require("mongoose");

const stateSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  abbreviation: { type: String, required: true, unique: true },
  geometry: {
    type: { type: String, enum: ["Polygon", "MultiPolygon"], required: true },
    coordinates: [],
  },
  properties: {
    population: Number,
    density: Number,
    capital: String,
    geoid: String,
  },
});

stateSchema.index({ geometry: "2dsphere" });
module.exports = mongoose.model("State", stateSchema);
