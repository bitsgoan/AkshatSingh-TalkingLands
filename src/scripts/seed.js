const mongoose = require("mongoose");
const fs = require("fs");
const csv = require("csv-parser");
const State = require("../models/State");
const connectDB = require("../config/database");

require("dotenv").config();
async function loadData() {
  try {
    await connectDB();

    const results = [];
    await new Promise((resolve, reject) => {
      fs.createReadStream("states.csv")
        .pipe(csv({ separator: ";" }))
        .on("data", (data) => {
          results.push(data);
        })
        .on("end", resolve)
        .on("error", reject);
    });

    for (const row of results) {
      try {
        // Parse the GeoJSON string from the CSV
        const geometryData = JSON.parse(row["St Asgeojson"]);

        const population = Math.floor(Math.random() * 900000) + 100000;

        const stateData = {
          name: row.name,
          abbreviation: row.stusab,
          geometry: {
            type: "Polygon",
            coordinates: geometryData.coordinates,
          },
          properties: {
            population: population,
            density: population / parseInt(row.arealand),
            geoid: row.geoid,
          },
        };

        // Remove existing state if it exists
        await State.deleteOne({ name: stateData.name });

        // Save new state data
        const state = new State(stateData);
        dbResponse = await state.save();
        console.log("DB Response ", dbResponse);

        console.log(`Successfully loaded data for ${stateData.name}`);
      } catch (error) {
        console.error(`Error processing state: ${row.name}`);
      }
    }

    console.log("All states loaded successfully");
    process.exit(0);
  } catch (error) {
    console.error("Error loading data:", error);
    process.exit(1);
  }
}

loadData();
