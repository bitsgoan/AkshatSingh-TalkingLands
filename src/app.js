const express = require("express");
const cors = require("cors");
const connectDB = require("./config/database");
const stateRoutes = require("./routes/stateRoutes");
const HomeRoutes = require("./routes/HomeRoutes");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to database
connectDB();

// Routes
app.use("/", HomeRoutes);
app.use("/api/states", stateRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
