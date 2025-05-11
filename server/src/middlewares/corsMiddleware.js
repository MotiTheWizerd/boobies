const cors = require('cors');
const logger = require('../utils/logger');

/**
 * Configure CORS middleware with proper settings for security
 * @returns {Function} Configured CORS middleware
 */
const setupCors = () => {
  const allowedOrigins = [
    process.env.CLIENT_URL || 'http://localhost:3000', 
    // Add more origins as needed
  ];

  const corsOptions = {
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, Postman)
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        logger.warn(`CORS blocked request from origin: ${origin}`);
        callback(new Error(`Origin ${origin} not allowed by CORS`));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    exposedHeaders: ['Content-Length', 'X-Total-Count'],
    preflightContinue: false,
    optionsSuccessStatus: 204,
    maxAge: 86400 // 24 hours
  };

  return cors(corsOptions);
};

module.exports = setupCors; 