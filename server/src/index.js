require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const { setupRoutes } = require("./routes");
const { errorHandler } = require("./middlewares/errorHandler");
const setupCors = require("./middlewares/corsMiddleware");
const logger = require("./utils/logger");

// Initialize express app
const app = express();
const PORT = process.env.PORT || 5000;

// Security Headers
app.use(helmet());

// CORS setup
app.use(setupCors());

// Request parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging
app.use(morgan("dev"));

// Setup routes
setupRoutes(app);

// Error handling middleware
app.use(errorHandler);

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", message: "Server is running" });
});

// Start server
app.listen(PORT, () => {
  const divider = "-".repeat(50);

  console.log(divider);
  console.log("🚀 Publish Board API Server");
  console.log(divider);

  logger.info(
    `Server running on port ${PORT} in ${
      process.env.NODE_ENV || "development"
    } mode`
  );
  logger.info(`Server accessible at http://localhost:${PORT}`);

  console.log("\n✅ API Endpoints:");
  console.log("  - Health Check: http://localhost:" + PORT + "/health");
  console.log("  - API Base URL: http://localhost:" + PORT + "/api");

  console.log("\n📱 Connect your front-end using:");
  console.log("  API_URL=http://localhost:" + PORT);

  console.log("\n💡 Test the API with:");
  console.log("  curl http://localhost:" + PORT + "/health");

  console.log(divider);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  logger.error("Unhandled Promise Rejection:", err);
  // Close server & exit process
  process.exit(1);
});

module.exports = app;
