const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const areas = ["מרכז", "דרום", "צפון", "שרון", "ירושלים"];

async function main() {
  for (const area_name of areas) {
    try {
      await prisma.area.create({ data: { area_name } });
      console.log(`Inserted area: ${area_name}`);
    } catch (err) {
      if (err.code === "P2002") {
        console.log(`Area already exists: ${area_name}`);
      } else {
        console.error(`Error inserting area ${area_name}:`, err);
      }
    }
  }
  await prisma.$disconnect();
}

main();
