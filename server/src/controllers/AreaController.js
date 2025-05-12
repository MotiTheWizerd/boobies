const prisma = require("../lib/prisma"); // Adjust path if necessary

const getAllAreas = async (req, res) => {
  try {
    const areas = await prisma.area.findMany(); // Query the 'area' table
    res.status(200).json(areas);
  } catch (error) {
    console.error("Error fetching areas:", error);
    res.status(500).json({ error: "Failed to fetch areas" });
  }
};

module.exports = {
  getAllAreas,
};
