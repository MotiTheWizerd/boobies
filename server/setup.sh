#!/bin/bash

# Exit script on any error
set -e

echo "=== Publish Board Server Setup ==="

# Install dependencies
echo "Installing dependencies..."
pnpm install

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
  echo "Creating .env file from example..."
  cp .env.example .env
fi

echo "=== Setup complete! ==="
echo ""
echo "To start the development server, run:"
echo "pnpm run dev"
echo ""
echo "To start the production server, run:"
echo "pnpm start" 