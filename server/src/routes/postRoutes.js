const express = require("express");
const {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  likePost,
  commentOnPost,
} = require("../controllers/postController");
const { protect } = require("../middlewares/auth");

const router = express.Router();

// Public routes
router.get("/", getAllPosts);
router.get("/:id", getPostById);

// Protected routes
router.post("/", protect, createPost);
router.put("/:id", protect, updatePost);
router.delete("/:id", protect, deletePost);
router.post("/:id/like", protect, likePost);
router.post("/:id/comment", protect, commentOnPost);

module.exports = router;
