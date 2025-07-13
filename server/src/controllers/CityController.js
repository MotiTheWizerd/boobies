const prisma = require("../lib/prisma"); // Adjust path if necessary

const getAllCities = async (req, res) => {
  try {
    const cities = await prisma.city.findMany();
    res.status(200).json(cities);
  } catch (error) {
    console.error("Error fetching cities:", error);
    res.status(500).json({ error: "Failed to fetch cities" });
  }
};

const getCitiesByArea = async (req, res) => {
  const { areaId } = req.params;
  
  if (!areaId) {
    return res.status(400).json({ error: "Area ID is required" });
  }

  try {
    const cities = await prisma.city.findMany({
      where: {
        area_id: parseInt(areaId)
      },
      select: {
        id: true,
        city_name: true
      }
    });
    
    res.status(200).json(cities);
  } catch (error) {
    console.error("Error fetching cities:", error);
    res.status(500).json({ error: "Failed to fetch cities" });
  }
};

module.exports = {
  getAllCities,
  getCitiesByArea
};
