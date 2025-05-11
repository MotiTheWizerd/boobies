/**
 * Post Service
 * Contains business logic for post operations
 */

/**
 * In a real application, this would interact with a database
 * For this example, we use an in-memory array as a mock database
 */
const postsDb = [
  {
    id: "1",
    title: "First Post",
    content: "This is the first post content",
    userId: "1",
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(), // 2 days ago
    likes: 5,
    likedBy: ["2", "3"],
    comments: [
      {
        id: "1",
        content: "Great post!",
        userId: "2",
        createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
      },
    ],
  },
  {
    id: "2",
    title: "Second Post",
    content: "This is the second post content",
    userId: "2",
    createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    likes: 10,
    likedBy: ["1", "3", "4"],
    comments: [
      {
        id: "2",
        content: "Nice content!",
        userId: "1",
        createdAt: new Date(Date.now() - 43200000).toISOString(), // 12 hours ago
      },
      {
        id: "3",
        content: "I agree!",
        userId: "3",
        createdAt: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
      },
    ],
  },
];

/**
 * Get all posts with optional filtering
 * @param {Object} filters - Filter options
 * @returns {Array} Array of posts
 */
const getAllPosts = async (filters = {}) => {
  let result = [...postsDb];

  // Apply filters if provided
  if (filters.userId) {
    result = result.filter((post) => post.userId === filters.userId);
  }

  // Sort by date (newest first)
  result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  // Map to add comment count
  return result.map((post) => ({
    ...post,
    commentCount: post.comments.length,
  }));
};

/**
 * Get post by ID
 * @param {string} id - Post ID
 * @returns {Object|null} Post object or null
 */
const getPostById = async (id) => {
  const post = postsDb.find((p) => p.id === id);
  return post || null;
};

/**
 * Create new post
 * @param {Object} postData - Post data
 * @param {string} userId - User ID
 * @returns {Object} Created post
 */
const createPost = async (postData, userId) => {
  const newPost = {
    id: Date.now().toString(),
    ...postData,
    userId,
    createdAt: new Date().toISOString(),
    likes: 0,
    likedBy: [],
    comments: [],
  };

  postsDb.push(newPost);
  return newPost;
};

/**
 * Update post
 * @param {string} id - Post ID
 * @param {Object} updateData - Data to update
 * @param {string} userId - User ID
 * @returns {Object|null} Updated post or null
 */
const updatePost = async (id, updateData, userId) => {
  const postIndex = postsDb.findIndex((p) => p.id === id);

  if (postIndex === -1) return null;

  // Check if user is the post owner
  if (postsDb[postIndex].userId !== userId) {
    return null; // Not authorized
  }

  // Only allow updating title and content
  const { title, content } = updateData;

  // Update post
  postsDb[postIndex] = {
    ...postsDb[postIndex],
    title: title || postsDb[postIndex].title,
    content: content || postsDb[postIndex].content,
    updatedAt: new Date().toISOString(),
  };

  return postsDb[postIndex];
};

/**
 * Delete post
 * @param {string} id - Post ID
 * @param {string} userId - User ID
 * @returns {boolean} Success status
 */
const deletePost = async (id, userId) => {
  const postIndex = postsDb.findIndex((p) => p.id === id);

  if (postIndex === -1) return false;

  // Check if user is the post owner
  if (postsDb[postIndex].userId !== userId) {
    return false; // Not authorized
  }

  postsDb.splice(postIndex, 1);
  return true;
};

/**
 * Like or unlike a post
 * @param {string} id - Post ID
 * @param {string} userId - User ID
 * @returns {Object|null} Updated like info or null
 */
const toggleLike = async (id, userId) => {
  const post = postsDb.find((p) => p.id === id);

  if (!post) return null;

  const isLiked = post.likedBy.includes(userId);

  if (isLiked) {
    // Unlike post
    post.likes = Math.max(0, post.likes - 1);
    post.likedBy = post.likedBy.filter((id) => id !== userId);
  } else {
    // Like post
    post.likes += 1;
    post.likedBy.push(userId);
  }

  return {
    likes: post.likes,
    liked: !isLiked,
  };
};

/**
 * Add comment to post
 * @param {string} postId - Post ID
 * @param {string} content - Comment content
 * @param {string} userId - User ID
 * @returns {Object|null} Created comment or null
 */
const addComment = async (postId, content, userId) => {
  const post = postsDb.find((p) => p.id === postId);

  if (!post) return null;

  const comment = {
    id: Date.now().toString(),
    content,
    userId,
    createdAt: new Date().toISOString(),
  };

  post.comments.push(comment);
  return comment;
};

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  toggleLike,
  addComment,
};
