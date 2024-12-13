const mongoose = require("mongoose");

const pointSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  eventTime: { type: String },
  price: { type: Number },
  location: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true,
    },
  },
  address: { type: String },
});

pointSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("Point", pointSchema);
