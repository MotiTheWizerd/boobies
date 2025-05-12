const express = require("express");
const { getAllAreas } = require("../controllers/AreaController");

const router = express.Router();

// Define the route to get all areas
// GET /api/areas (assuming /api prefix is added in index.js)
router.get("/", getAllAreas);

module.exports = router;
