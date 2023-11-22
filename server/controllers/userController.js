// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const User = require('../models/User');
// const secret = "mysecretsshhhhh";

// const userController = {
//   // Register a new user
//   registerUser: async (req, res) => {
//     try {
//       const { username, password } = req.body;

//       // Check if the username is already taken
//       const existingUser = await User.findOne({ username });
//       if (existingUser) {
//         return res.status(400).json({ error: 'Username is already taken' });
//       }

//       // Hash the password before saving it to the database
//       const hashedPassword = await bcrypt.hash(password, 10);

//       const newUser = new User({
//         username,
//         password: hashedPassword,
//       });

//       await newUser.save();

//       res.status(201).json({ success: true, message: 'User registered successfully' });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   },

//   // Login user
//   loginUser: async (req, res) => {
//     try {
//       const { username, password } = req.body;

//       const user = await User.findOne({ username });
//       if (!user) {
//         return res.status(401).json({ error: 'User not found' });
//       }

//       const isPasswordValid = await bcrypt.compare(password, user.password);
//       if (!isPasswordValid) {
//         return res.status(401).json({ error: 'Invalid password' });
//       }

//       // Generate JWT token
//       const token = jwt.sign({ userId: user._id, username: user.username }, secret, {
//         expiresIn: '1h', // You can set the expiration time as needed
//       });

//       res.json({ success: true, token });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   },

//   // Get user profile
//   getUserProfile: async (req, res) => {
//     try {
//       // Fetch user data from the authenticated user
//       const user = await User.findById(req.user.userId);
//       if (!user) {
//         return res.status(404).json({ error: 'User not found' });
//       }

//       // Exclude sensitive information (like password) before sending the response
//       const userProfile = {
//         username: user.username,
//         // Add other user-related fields...
//       };

//       res.json(userProfile);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   },

//   // Update user profile
//   updateUserProfile: async (req, res) => {
//     try {
//       const { username, newPassword } = req.body;

//       // Fetch user data from the authenticated user
//       const user = await User.findById(req.user.userId);
//       if (!user) {
//         return res.status(404).json({ error: 'User not found' });
//       }

//       // Update username if provided
//       if (username) {
//         user.username = username;
//       }

//       // Update password if provided
//       if (newPassword) {
//         const hashedPassword = await bcrypt.hash(newPassword, 10);
//         user.password = hashedPassword;
//       }

//       await user.save();

//       res.json({ success: true, message: 'User profile updated successfully' });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   },
// };

// module.exports = userController;
