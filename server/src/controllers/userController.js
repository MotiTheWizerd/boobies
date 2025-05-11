const { ApiError } = require("../middlewares/errorHandler");
const logger = require("../utils/logger");
const prisma = require("../lib/prisma");
const bcrypt = require("bcryptjs");

/**
 * Login user
 * @route POST /api/users/login
 * @access Public
 */
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Basic validation
    if (!email || !password) {
      return next(new ApiError(400, "Please provide email and password"));
    }

    // Find the user by email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return next(new ApiError(401, "Invalid credentials"));
    }

    // Check if password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return next(new ApiError(401, "Invalid credentials"));
    }

    // Return user data (without password)
    const { password: _, ...userWithoutPassword } = user;

    res.status(200).json({
      success: true,
      data: userWithoutPassword,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Register a new user
 * @route POST /api/users/register
 * @access Public
 */
const createUser = async (req, res, next) => {
  try {
    const { email, username, name, password, bio, avatar } = req.body;

    // Check if user already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });

    if (existingUser) {
      return next(new ApiError(400, "Email or username already in use"));
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const newUser = await prisma.user.create({
      data: {
        email,
        username,
        name,
        password: hashedPassword,
        bio,
        avatar,
      },
    });

    // Remove password from response
    const { password: _, ...userWithoutPassword } = newUser;

    res.status(201).json({
      success: true,
      data: userWithoutPassword,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get all users
 * @route GET /api/users
 * @access Private/Admin
 */
const getAllUsers = async (req, res, next) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        username: true,
        name: true,
        bio: true,
        avatar: true,
        isCreator: true,
        createdAt: true,
        // Exclude password for security
      },
    });

    res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get user by ID
 * @route GET /api/users/:id
 * @access Private
 */
const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        username: true,
        name: true,
        bio: true,
        avatar: true,
        isCreator: true,
        createdAt: true,
        // Exclude password for security
      },
    });

    if (!user) {
      return next(new ApiError(404, "User not found"));
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update user
 * @route PUT /api/users/:id
 * @access Private
 */
const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, bio, avatar, isCreator } = req.body;

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { id },
    });

    if (!existingUser) {
      return next(new ApiError(404, "User not found"));
    }

    // Update the user
    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        name,
        bio,
        avatar,
        isCreator,
      },
      select: {
        id: true,
        email: true,
        username: true,
        name: true,
        bio: true,
        avatar: true,
        isCreator: true,
        createdAt: true,
        updatedAt: true,
        // Exclude password for security
      },
    });

    res.status(200).json({
      success: true,
      data: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete user
 * @route DELETE /api/users/:id
 * @access Private/Admin
 */
const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { id },
    });

    if (!existingUser) {
      return next(new ApiError(404, "User not found"));
    }

    // Delete the user
    await prisma.user.delete({
      where: { id },
    });

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  loginUser,
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
