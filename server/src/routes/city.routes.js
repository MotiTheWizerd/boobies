const express = require("express");
const { getAllCities, getCitiesByArea } = require("../controllers/CityController");

const router = express.Router();

// GET /api/cities - Get all cities
router.get("/", getAllCities);

// GET /api/cities/:areaId - Get cities by area ID
router.get("/:areaId", getCitiesByArea);

module.exports = router;
