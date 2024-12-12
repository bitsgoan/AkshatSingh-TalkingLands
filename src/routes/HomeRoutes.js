const express = require("express");
const router = express.Router();
const State = require("../models/State");

router.get("/", async (req, res) => {
  res.json({ message: "It is working" });
});

module.exports = router;
