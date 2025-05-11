# Publish Board API Server

This is the backend API server for the Publish Board social media platform.

## Features

- RESTful API with Express
- User authentication and authorization
- Post management (create, read, update, delete)
- Likes and comments functionality
- Error handling and logging
- Security with Helmet middleware

## Project Structure

```
server/
├── src/
│   ├── controllers/        # Request handlers
│   ├── middlewares/        # Express middlewares
│   ├── routes/             # API routes
│   ├── services/           # Business logic
│   ├── utils/              # Utility functions
│   ├── interfaces/         # TypeScript interfaces (when using TS)
│   ├── types/              # TypeScript types (when using TS)
│   └── index.js            # Entry point
├── .env.example            # Environment variables example
├── package.json            # Dependencies and scripts
└── README.md               # This file
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- pnpm

### Installation

1. Clone the repository
2. Navigate to the server directory
3. Install dependencies:

```bash
cd server
pnpm install
```

4. Create a `.env` file based on `.env.example`
5. Start the development server:

```bash
pnpm run dev
```

## API Endpoints

### Authentication

- `POST /api/users/login` - User login
- `POST /api/users/register` - User registration

### Users

- `GET /api/users` - Get all users (admin only)
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user (admin only)

### Posts

- `GET /api/posts` - Get all posts
- `GET /api/posts/:id` - Get post by ID
- `POST /api/posts` - Create a new post
- `PUT /api/posts/:id` - Update post
- `DELETE /api/posts/:id` - Delete post
- `POST /api/posts/:id/like` - Like/unlike post
- `POST /api/posts/:id/comment` - Comment on post

## Development

This project uses:

- Express.js for the server framework
- Winston for logging
- Helmet for security headers
- Morgan for request logging
- Cors for cross-origin support

## Scripts

- `pnpm start` - Start the production server
- `pnpm run dev` - Start the development server with hot-reload
- `pnpm run lint` - Run linting
- `pnpm test` - Run tests
