const express = require('express');
const cartController = require('../../controllers/cartController');
const authenticateUser = require('../../utils/auth');

const router = express.Router();

// Define cart routes
router.get('/', authenticateUser, cartController.getCart);
router.post('/add', authenticateUser, cartController.addItemToCart);
router.put('/update', authenticateUser, cartController.updateCartItemQuantity);
router.delete('/remove/:productId', authenticateUser, cartController.removeItemFromCart);

module.exports = router;
