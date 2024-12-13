const express = require("express");
const router = express.Router();
const pointController = require("../controllers/pointController");

router.get("/", pointController.getAllPoints);
router.post("/", pointController.createPoint);
router.get("/within", pointController.findWithinRadius);
router.put("/:id", pointController.updatePoint);

module.exports = router;
