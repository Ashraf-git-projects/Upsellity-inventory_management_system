const express = require("express");
const {
  getInventoryAnalytics,
} = require("../controllers/analytics.controller");

const router = express.Router();

router.get("/analytics", getInventoryAnalytics);

module.exports = router;
