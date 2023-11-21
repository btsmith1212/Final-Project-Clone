const express = require('express');
const userRoutes = require('./userRoutes');
const productRoutes = require('./productRoutes');
const cartRoutes = require('./cartRoutes');

const router = express.Router();

// Use separate route files for different components (users, products, cart, etc.)
router.use('/users', userRoutes);
router.use('/products', productRoutes);
router.use('/cart', cartRoutes);

module.exports = router;
