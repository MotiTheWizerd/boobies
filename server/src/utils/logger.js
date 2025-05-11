const winston = require("winston");

// Define log formats
const formats = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format.errors({ stack: true }),
  winston.format.splat(),
  winston.format.json()
);

// Define console format for development
const consoleFormat = winston.format.printf(
  ({ level, message, timestamp, stack }) => {
    if (stack) {
      return `${timestamp} ${level}: ${message} - ${stack}`;
    }
    return `${timestamp} ${level}: ${message}`;
  }
);

// Create the logger instance
const logger = winston.createLogger({
  level: process.env.NODE_ENV === "production" ? "info" : "debug",
  format: formats,
  defaultMeta: { service: "publish-board-api" },
  transports: [
    // Console transport for all environments
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple(),
        consoleFormat
      ),
    }),
    // File transport for production
    ...(process.env.NODE_ENV === "production"
      ? [
          new winston.transports.File({
            filename: "logs/error.log",
            level: "error",
          }),
          new winston.transports.File({ filename: "logs/combined.log" }),
        ]
      : []),
  ],
});

module.exports = logger;
