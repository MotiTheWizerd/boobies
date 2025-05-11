const { ApiError } = require("../middlewares/errorHandler");
const logger = require("../utils/logger");

/**
 * Get all posts
 * @route GET /api/posts
 * @access Public
 */
const getAllPosts = async (req, res, next) => {
  try {
    // Simulate fetching posts
    const posts = [
      {
        id: "1",
        title: "First Post",
        content: "This is the first post content",
        userId: "1",
        createdAt: new Date().toISOString(),
        likes: 5,
        comments: 2,
      },
      {
        id: "2",
        title: "Second Post",
        content: "This is the second post content",
        userId: "2",
        createdAt: new Date().toISOString(),
        likes: 10,
        comments: 5,
      },
    ];

    res.status(200).json({
      success: true,
      count: posts.length,
      data: posts,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get post by ID
 * @route GET /api/posts/:id
 * @access Public
 */
const getPostById = async (req, res, next) => {
  try {
    const postId = req.params.id;

    // Simulate fetching post
    const post = {
      id: postId,
      title: "Sample Post",
      content: "This is a sample post content",
      userId: "1",
      createdAt: new Date().toISOString(),
      likes: 15,
      comments: [
        {
          id: "1",
          content: "Great post!",
          userId: "2",
          createdAt: new Date().toISOString(),
        },
      ],
    };

    if (!post) {
      return next(new ApiError(404, `Post not found with id: ${postId}`));
    }

    res.status(200).json({
      success: true,
      data: post,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Create a new post
 * @route POST /api/posts
 * @access Private
 */
const createPost = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    const userId = req.user.id;

    // Basic validation
    if (!title || !content) {
      return next(new ApiError(400, "Please provide title and content"));
    }

    // Simulate creating post
    const post = {
      id: Date.now().toString(),
      title,
      content,
      userId,
      createdAt: new Date().toISOString(),
      likes: 0,
      comments: [],
    };

    res.status(201).json({
      success: true,
      data: post,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update post
 * @route PUT /api/posts/:id
 * @access Private
 */
const updatePost = async (req, res, next) => {
  try {
    const postId = req.params.id;
    const { title, content } = req.body;
    const userId = req.user.id;

    // Simulate fetching post
    let post = {
      id: postId,
      title: "Original Title",
      content: "Original Content",
      userId: "1",
      createdAt: new Date().toISOString(),
      likes: 5,
      comments: [],
    };

    // Check if post exists
    if (!post) {
      return next(new ApiError(404, `Post not found with id: ${postId}`));
    }

    // Check if user is post owner
    if (post.userId !== userId) {
      return next(new ApiError(403, "Not authorized to update this post"));
    }

    // Update post
    post = {
      ...post,
      title: title || post.title,
      content: content || post.content,
      updatedAt: new Date().toISOString(),
    };

    res.status(200).json({
      success: true,
      data: post,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete post
 * @route DELETE /api/posts/:id
 * @access Private
 */
const deletePost = async (req, res, next) => {
  try {
    const postId = req.params.id;
    const userId = req.user.id;

    // Simulate fetching post
    const post = {
      id: postId,
      title: "Sample Post",
      content: "This is a sample post content",
      userId: "1", // Same as req.user.id for this example
      createdAt: new Date().toISOString(),
    };

    // Check if post exists
    if (!post) {
      return next(new ApiError(404, `Post not found with id: ${postId}`));
    }

    // Check if user is post owner
    if (post.userId !== userId) {
      return next(new ApiError(403, "Not authorized to delete this post"));
    }

    // In a real app, delete post from database

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Like post
 * @route POST /api/posts/:id/like
 * @access Private
 */
const likePost = async (req, res, next) => {
  try {
    const postId = req.params.id;
    const userId = req.user.id;

    // Simulate fetching post
    const post = {
      id: postId,
      title: "Sample Post",
      content: "This is a sample post content",
      userId: "2", // Different from req.user.id
      createdAt: new Date().toISOString(),
      likes: 5,
      likedBy: ["3", "4"], // User IDs who liked the post
    };

    // Check if post exists
    if (!post) {
      return next(new ApiError(404, `Post not found with id: ${postId}`));
    }

    // Check if user already liked the post
    const alreadyLiked = post.likedBy.includes(userId);

    // Toggle like
    if (alreadyLiked) {
      // Unlike
      post.likes -= 1;
      post.likedBy = post.likedBy.filter((id) => id !== userId);
    } else {
      // Like
      post.likes += 1;
      post.likedBy.push(userId);
    }

    res.status(200).json({
      success: true,
      data: {
        likes: post.likes,
        liked: !alreadyLiked,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Comment on post
 * @route POST /api/posts/:id/comment
 * @access Private
 */
const commentOnPost = async (req, res, next) => {
  try {
    const postId = req.params.id;
    const { content } = req.body;
    const userId = req.user.id;

    // Basic validation
    if (!content) {
      return next(new ApiError(400, "Please provide comment content"));
    }

    // Simulate fetching post
    const post = {
      id: postId,
      title: "Sample Post",
      content: "This is a sample post content",
      userId: "2", // Different from req.user.id
      createdAt: new Date().toISOString(),
      comments: [
        {
          id: "1",
          content: "Existing comment",
          userId: "3",
          createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
        },
      ],
    };

    // Check if post exists
    if (!post) {
      return next(new ApiError(404, `Post not found with id: ${postId}`));
    }

    // Create new comment
    const comment = {
      id: Date.now().toString(),
      content,
      userId,
      createdAt: new Date().toISOString(),
    };

    // Add comment to post
    post.comments.push(comment);

    res.status(201).json({
      success: true,
      data: comment,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  likePost,
  commentOnPost,
};
