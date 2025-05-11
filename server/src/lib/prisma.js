const { PrismaClient } = require("../../node_modules/.prisma/client");

// Create a singleton instance of the PrismaClient to be used across the application
const prisma = new PrismaClient();

// Add middleware for logging if needed
// prisma.$use(async (params, next) => {
//   const before = Date.now()
//   const result = await next(params)
//   const after = Date.now()
//   console.log(`Query ${params.model}.${params.action} took ${after - before}ms`)
//   return result
// })

// Handle the connection during shutdown gracefully
process.on("beforeExit", async () => {
  await prisma.$disconnect();
});

module.exports = prisma;
