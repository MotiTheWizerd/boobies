const express = require("express");
const { getAllCities } = require("../controllers/CityController");

const router = express.Router();

// Define the route to get all cities
// GET /api/cities (assuming /api prefix is added in index.js)
router.get("/", getAllCities);

module.exports = router;
