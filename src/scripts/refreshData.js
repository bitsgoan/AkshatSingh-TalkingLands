const mongoose = require("mongoose");
const fs = require("fs");
const csv = require("csv-parser");
const State = require("../models/State");
const connectDB = require("../config/database");

async function simplifyCoordinates(coordinates, maxPoints = 200) {
  // Take evenly spaced points from the array
  const step = Math.max(1, Math.floor(coordinates[0].length / maxPoints));
  const simplified = coordinates[0].filter((_, index) => index % step === 0);

  // Ensure the last point matches the first to close the polygon
  if (
    JSON.stringify(simplified[0]) !==
    JSON.stringify(simplified[simplified.length - 1])
  ) {
    simplified.push(simplified[0]);
  }

  return [simplified];
}

async function refreshData() {
  try {
    await connectDB();

    // Delete all existing data
    console.log("Deleting existing data...");
    await State.deleteMany({});
    console.log("All existing data deleted.");

    // Read and parse CSV
    const results = [];
    await new Promise((resolve, reject) => {
      fs.createReadStream("states.csv")
        .pipe(csv({ separator: ";" }))
        .on("data", (data) => results.push(data))
        .on("end", resolve)
        .on("error", reject);
    });

    for (const row of results) {
      try {
        // Parse the GeoJSON string from the CSV
        const geometryData = JSON.parse(row["St Asgeojson"]);

        // Simplify coordinates to max 200 points
        const simplifiedCoordinates = await simplifyCoordinates(
          geometryData.coordinates,
          200
        );

        const population = Math.floor(Math.random() * 900000) + 100000;

        const stateData = {
          name: row.name,
          abbreviation: row.stusab,
          geometry: {
            type: "Polygon",
            coordinates: simplifiedCoordinates,
          },
          properties: {
            population: population,
            density: population / parseInt(row.arealand),
            intptlat: parseFloat(row.intptlat),
            intptlon: parseFloat(row.intptlon),
            arealand: parseInt(row.arealand),
            areawater: parseInt(row.areawater),
            geoid: row.geoid,
          },
        };

        // Save new state data
        const state = new State(stateData);
        await state.save();

        console.log(
          `Successfully loaded simplified data for ${stateData.name} with ${simplifiedCoordinates[0].length} points`
        );
      } catch (error) {
        console.error(`Error processing state: ${row.name}`, error);
      }
    }

    console.log("All states loaded successfully with simplified coordinates");
    process.exit(0);
  } catch (error) {
    console.error("Error refreshing data:", error);
    process.exit(1);
  }
}

refreshData();
