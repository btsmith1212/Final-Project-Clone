const express = require('express');
const userRoutes = require('./api/userRoutes');
const productRoutes = require('./api/productRoutes');
const cartRoutes = require('./api/cartRoutes');

const router = express.Router();

// Use separate route files for different components (users, products, cart, etc.)
router.use('/users', userRoutes);
router.use('/products', productRoutes);
router.use('/cart', cartRoutes);

module.exports = router;
