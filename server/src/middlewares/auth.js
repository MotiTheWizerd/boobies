const { ApiError } = require("./errorHandler");

/**
 * Middleware to protect routes - placeholder for actual JWT verification
 * In a real app, this would verify a JWT token
 */
const protect = (req, res, next) => {
  try {
    // Get token from header
    const token = req.headers.authorization?.split(" ")[1];

    // Check if token exists
    if (!token) {
      return next(new ApiError(401, "Not authorized, no token provided"));
    }

    // In a real app, verify the token here
    // Example with JWT:
    // const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // req.user = decoded;

    // For now, just simulate authentication
    req.user = {
      id: "1",
      name: "Test User",
      email: "test@example.com",
      role: "user",
    };

    next();
  } catch (error) {
    next(new ApiError(401, "Not authorized, token failed"));
  }
};

/**
 * Middleware to restrict access based on user role
 */
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new ApiError(401, "Not authorized, please login"));
    }

    if (!roles.includes(req.user.role)) {
      return next(new ApiError(403, "Not authorized to access this resource"));
    }

    next();
  };
};

module.exports = {
  protect,
  authorize,
};
