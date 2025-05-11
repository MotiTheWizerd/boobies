const express = require("express");
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
} = require("../controllers/userController");
const { protect, authorize } = require("../middlewares/auth");

const router = express.Router();

// Public routes
router.post("/login", loginUser);
router.post("/register", createUser);

// Protected routes
router.get("/", protect, authorize("admin"), getAllUsers);
router.get("/:id", protect, getUserById);
router.put("/:id", protect, updateUser);
router.delete("/:id", protect, authorize("admin"), deleteUser);

module.exports = router;
