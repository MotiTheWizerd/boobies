const userRoutes = require("./userRoutes");
const postRoutes = require("./postRoutes");
const clientRoutes = require("./clientRoutes");
const campaignRoutes = require("./campaignRoutes");
const adRoutes = require("./adRoutes");
const { ApiError } = require("../middlewares/errorHandler");

/**
 * Sets up all routes for the application
 * @param {Express} app - Express application
 */
const setupRoutes = (app) => {
  // API routes
  app.use("/api/users", userRoutes);
  app.use("/api/posts", postRoutes);
  app.use("/api/clients", clientRoutes);
  app.use("/api/campaigns", campaignRoutes);
  app.use("/api/ads", adRoutes);

  // API Documentation route - can be implemented later with Swagger
  app.get("/api/docs", (req, res) => {
    res.status(200).json({
      message: "API Documentation - Coming Soon",
    });
  });

  // Handle 404 errors - no route matched
  app.use("*", (req, res, next) => {
    next(new ApiError(404, `Not found - ${req.originalUrl}`));
  });
};

module.exports = {
  setupRoutes,
};
