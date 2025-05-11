const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Clear existing data
  await prisma.user.deleteMany();

  console.log("User table cleared");

  // Create users
  const hashedPassword = await bcrypt.hash("password123", 10);

  await prisma.user.create({
    data: {
      email: "alice@example.com",
      username: "alice",
      name: "Alice Johnson",
      password: hashedPassword,
      bio: "Content creator and fitness enthusiast.",
      avatar: "https://i.pravatar.cc/150?u=alice",
      isCreator: true,
    },
  });

  await prisma.user.create({
    data: {
      email: "bob@example.com",
      username: "bob",
      name: "Bob Smith",
      password: hashedPassword,
      bio: "Tech enthusiast and gamer.",
      avatar: "https://i.pravatar.cc/150?u=bob",
      isCreator: false,
    },
  });

  await prisma.user.create({
    data: {
      email: "charlie@example.com",
      username: "charlie",
      name: "Charlie Davis",
      password: hashedPassword,
      bio: "Music producer and DJ.",
      avatar: "https://i.pravatar.cc/150?u=charlie",
      isCreator: true,
    },
  });

  console.log("Users created");
  console.log("Database seeding completed successfully");
}

main()
  .catch((e) => {
    console.error("Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
