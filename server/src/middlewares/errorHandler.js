const logger = require("../utils/logger");

/**
 * Custom error class for API errors
 */
class ApiError extends Error {
  constructor(statusCode, message, isOperational = true, stack = "") {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

/**
 * Wrapper for async route handlers to catch errors
 * @param {Function} fn - Async function to wrap
 * @returns {Function} Express middleware function
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

/**
 * Error handler middleware
 */
const errorHandler = (err, req, res, next) => {
  // Default error values
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";
  let stack = process.env.NODE_ENV === "production" ? "🥞" : err.stack;

  // Log the error
  logger.error(
    `${statusCode} - ${message} - ${req.originalUrl} - ${req.method} - ${req.ip}`
  );

  if (process.env.NODE_ENV !== "production") {
    logger.error(err.stack);
  }

  // Specific error handling for known types
  if (err.name === "ValidationError") {
    statusCode = 400;
    message = err.message;
  }

  if (err.name === "UnauthorizedError") {
    statusCode = 401;
    message = "Unauthorized";
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === "development" && { stack }),
  });
};

module.exports = {
  errorHandler,
  ApiError,
  asyncHandler,
};
