#!/bin/bash

# Exit script on any error
set -e

echo "=== Starting Publish Board Server ==="

# Check if dependencies are installed
if [ ! -d "node_modules" ]; then
  echo "Dependencies not installed. Running setup first..."
  bash ./setup.sh
fi

echo "Starting server in development mode..."
pnpm run dev 