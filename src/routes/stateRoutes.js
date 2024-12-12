// File: src/routes/stateRoutes.js
const express = require("express");
const router = express.Router();
const State = require("../models/State");

// Get all states
router.get("/", async (req, res) => {
  try {
    const states = await State.find({});
    res.json(states);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get state by name
router.get("/:name", async (req, res) => {
  try {
    const state = await State.findOne({ name: req.params.name });
    if (!state) return res.status(404).json({ error: "State not found" });
    res.json(state);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new state
router.post("/", async (req, res) => {
  try {
    const state = new State(req.body);
    await state.save();
    res.status(201).json(state);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update state
router.put("/:name", async (req, res) => {
  try {
    const state = await State.findOneAndUpdate(
      { name: req.params.name },
      req.body,
      { new: true }
    );
    if (!state) return res.status(404).json({ error: "State not found" });
    res.json(state);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
