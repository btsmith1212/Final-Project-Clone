const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');

const registerUser = async (_, { input }) => {
  const { username, password } = input;

  // Check if the username is already taken
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    throw new Error('Username is already taken');
  }

  // Hash the password before saving it to the database
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    username,
    password: hashedPassword,
  });

  await newUser.save();

  return { success: true, message: 'User registered successfully' };
};

const loginUser = async (_, { input }) => {
  const { username, password } = input;

  const user = await User.findOne({ username });
  if (!user) {
    throw new Error('User not found');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error('Invalid password');
  }

  // Generate JWT token
  const token = jwt.sign({ userId: user.id, username: user.username }, 'your-secret-key', {
    expiresIn: '1h', // You can set the expiration time as needed
  });

  return { success: true, token };
};

module.exports = {
  registerUser,
  loginUser,
};