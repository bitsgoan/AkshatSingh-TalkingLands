const express = require("express");
const cors = require("cors");
const connectDB = require("./config/database");
const stateRoutes = require("./routes/stateRoutes");
const pointRoutes = require("./routes/pointRoutes");

const HomeRoutes = require("./routes/HomeRoutes");
const Point = require("./models/Point");

const swaggerUi = require("swagger-ui-express");
const { specs } = require("./config/swagger");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to database
connectDB();

// Routes
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
app.use("/", HomeRoutes);
app.use("/api/states", stateRoutes);
app.use("/api/points/", pointRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
