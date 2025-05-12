const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const cities = ["ירושלים", "מודעין"];

const area_id = 5;

async function main() {
  for (const city_name of cities) {
    try {
      await prisma.city.create({ data: { city_name, area_id } });
      console.log(`Inserted city: ${city_name}`);
    } catch (err) {
      if (err.code === "P2002") {
        console.log(`City already exists: ${city_name}`);
      } else {
        console.error(`Error inserting city ${city_name}:`, err);
      }
    }
  }
  await prisma.$disconnect();
}

main();
