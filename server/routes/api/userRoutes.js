const express = require('express');
const userController = require('../../controllers/userController');
const authenticateUser = require('../../utils/auth');

const router = express.Router();

// POST /api/users/register
router.post('/register', userController.registerUser);

// POST /api/users/login
router.post('/login', userController.loginUser);

// GET /api/users/profile
// Requires authentication
router.get('/profile', authenticateUser, userController.getUserProfile);

// PUT /api/users/profile
// Requires authentication
router.put('/profile', authenticateUser, userController.updateUserProfile);

module.exports = router;
