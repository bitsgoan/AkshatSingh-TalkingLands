// FOR SEEDING POINT DATA

const mongoose = require("mongoose");
const Point = require("../models/Point");
const connectDB = require("../config/database");

// Sample data for Washington DC area events
const samplePoints = [
  {
    name: "Muhsinah at Black Cat",
    description:
      "Jazz-influenced hip hop artist Muhsinah plays with Exit Clov and Gods'illa",
    eventTime: "9:00 p.m.",
    price: 12,
    location: {
      type: "Point",
      coordinates: [-77.031952, 38.917072],
    },
    address: "1811 14th Street NW",
  },
  {
    name: "Art Exhibition at National Gallery",
    description: "Contemporary Art Exhibition",
    eventTime: "10:00 a.m.",
    price: 0,
    location: {
      type: "Point",
      coordinates: [-77.019951, 38.891566],
    },
    address: "6th & Constitution Ave NW",
  },
  {
    name: "Jazz in the Garden",
    description: "Weekly summer jazz concert series",
    eventTime: "5:00 p.m.",
    price: 0,
    location: {
      type: "Point",
      coordinates: [-77.022964, 38.892062],
    },
    address: "National Gallery of Art Sculpture Garden",
  },
  {
    name: "Theater Performance",
    description: "Local theater group performance",
    eventTime: "7:30 p.m.",
    price: 25,
    location: {
      type: "Point",
      coordinates: [-77.023554, 38.920744],
    },
    address: "1529 16th Street NW",
  },
  {
    name: "Farmers Market",
    description: "Weekly farmers market with local produce",
    eventTime: "8:00 a.m.",
    price: 0,
    location: {
      type: "Point",
      coordinates: [-77.021918, 38.919959],
    },
    address: "14th and U Street NW",
  },
];

async function seedData() {
  try {
    await connectDB();
    console.log("Connected to database...");

    // Insert sample data
    await Point.insertMany(samplePoints);
    console.log(`Inserted ${samplePoints.length} sample points`);

    console.log("Seeding completed successfully");
    process.exit(0);
  } catch (error) {
    console.error("Seeding error:", error);
    process.exit(1);
  }
}

seedData();
