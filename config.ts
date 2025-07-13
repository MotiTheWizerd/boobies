// Config values from environment variables with type checking and defaults
export const EXPRESS_API_URL = process.env.EXPRESS_API_URL || 'http://localhost:3001';

// Add type checking to ensure environment variables are set
if (!process.env.EXPRESS_API_URL) {
  console.warn('Warning: EXPRESS_API_URL environment variable is not set, using default: http://localhost:3001');
}
