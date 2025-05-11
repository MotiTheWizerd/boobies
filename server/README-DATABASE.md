# Database Setup with Prisma

This project uses Prisma ORM to connect to a PostgreSQL database.

## Setup

1. **Create `.env` file**: Create a `.env` file in the server root directory with your PostgreSQL connection string:

```
PORT=5000
NODE_ENV=development

# Database Configuration
DATABASE_URL="postgresql://username:password@localhost:5432/social_media_db?schema=public"

# JWT Secret for Authentication
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=30d

# Logging
LOG_LEVEL=info
```

Replace `username`, `password`, and potentially the database name `social_media_db` with your actual PostgreSQL credentials.

2. **Initial Database Setup**:

```bash
# Generate Prisma client
npm run prisma:generate

# Create database migrations based on your schema
npm run prisma:migrate

# Seed the database with initial data
npm run prisma:seed
```

## Database Schema

The database schema is defined in `prisma/schema.prisma` and currently includes the User model:

- **User**: Platform users with authentication information

## Development Workflow

- **Modify Schema**: Update `prisma/schema.prisma` when you need to change the data model
- **Create Migration**: Run `npm run prisma:migrate` to create and apply migrations
- **Explore Data**: Use `npm run prisma:studio` to open Prisma Studio for visual database access
- **Update Client**: Run `npm run prisma:generate` after schema changes to update the client code

## Using Prisma in Code

The Prisma client is initialized as a singleton in `src/lib/prisma.js`:

```javascript
const prisma = require("../lib/prisma");

// Example: Get all users
const getUsers = async () => {
  return await prisma.user.findMany();
};

// Example: Create a new user
const createUser = async (data) => {
  return await prisma.user.create({
    data: {
      email: data.email,
      username: data.username,
      name: data.name,
      password: data.password,
    },
  });
};
```

## Seeding Data

The database can be populated with test data using the seeding script at `prisma/seed.js`. Run it with:

```bash
npm run prisma:seed
```

You can modify this file to add different seed data as needed during development.

## Troubleshooting

- **Connection Issues**: Verify your PostgreSQL server is running and accessible
- **Migration Problems**: Check error messages and fix schema issues before migrating
- **Schema Changes**: Run `prisma db pull` if you made direct database changes that need to be reflected in the schema

For more information, refer to the [Prisma documentation](https://www.prisma.io/docs/).
