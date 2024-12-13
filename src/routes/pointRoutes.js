const express = require("express");
const router = express.Router();
const pointController = require("../../../../backend/controllers/pointController");

router.get("/", pointController.getAllPoints);
router.post("/", pointController.createPoint);
router.get("/within", pointController.findWithinRadius);
router.put("/:id", pointController.updatePoint);
router.delete("/:id", pointController.deletePoint);

module.exports = router;
