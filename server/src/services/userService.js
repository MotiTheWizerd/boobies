/**
 * User Service
 * Contains business logic for user operations
 */

/**
 * In a real application, this would interact with a database
 * For this example, we use an in-memory array as a mock database
 */
const usersDb = [
  {
    id: '1',
    name: 'Test User',
    email: 'test@example.com',
    password: 'password123', // In a real app, this would be hashed
    role: 'user',
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'admin123', // In a real app, this would be hashed
    role: 'admin',
    createdAt: new Date().toISOString()
  }
];

/**
 * Get all users
 * @returns {Array} Array of users without passwords
 */
const getAllUsers = async () => {
  return usersDb.map(user => {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  });
};

/**
 * Get user by ID
 * @param {string} id - User ID
 * @returns {Object|null} User object without password or null
 */
const getUserById = async (id) => {
  const user = usersDb.find(u => u.id === id);
  
  if (!user) return null;
  
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

/**
 * Get user by email
 * @param {string} email - User email
 * @returns {Object|null} User object or null
 */
const getUserByEmail = async (email) => {
  return usersDb.find(u => u.email === email) || null;
};

/**
 * Create new user
 * @param {Object} userData - User data
 * @returns {Object} Created user without password
 */
const createUser = async (userData) => {
  const newUser = {
    id: Date.now().toString(),
    ...userData,
    createdAt: new Date().toISOString()
  };
  
  usersDb.push(newUser);
  
  const { password, ...userWithoutPassword } = newUser;
  return userWithoutPassword;
};

/**
 * Update user
 * @param {string} id - User ID
 * @param {Object} updateData - Data to update
 * @returns {Object|null} Updated user without password or null
 */
const updateUser = async (id, updateData) => {
  const userIndex = usersDb.findIndex(u => u.id === id);
  
  if (userIndex === -1) return null;
  
  // Prevent updating sensitive fields
  const { password, role, ...safeUpdateData } = updateData;
  
  // Update user
  usersDb[userIndex] = {
    ...usersDb[userIndex],
    ...safeUpdateData,
    updatedAt: new Date().toISOString()
  };
  
  const { password: pw, ...userWithoutPassword } = usersDb[userIndex];
  return userWithoutPassword;
};

/**
 * Delete user
 * @param {string} id - User ID
 * @returns {boolean} Success status
 */
const deleteUser = async (id) => {
  const userIndex = usersDb.findIndex(u => u.id === id);
  
  if (userIndex === -1) return false;
  
  usersDb.splice(userIndex, 1);
  return true;
};

/**
 * Authenticate user
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Object|null} User object without password or null
 */
const authenticateUser = async (email, password) => {
  const user = await getUserByEmail(email);
  
  if (!user) return null;
  
  // In a real app, use bcrypt.compare or similar to check hashed password
  const isPasswordValid = user.password === password;
  
  if (!isPasswordValid) return null;
  
  const { password: pw, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

module.exports = {
  getAllUsers,
  getUserById,
  getUserByEmail,
  createUser,
  updateUser,
  deleteUser,
  authenticateUser
}; 