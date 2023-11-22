const express = require('express');
const userRoutes = require('./api/userRoutes');
const productRoutes = require('./api/productRoutes');
const cartRoutes = require('./api/cartRoutes');

const router = express.Router();

// Use separate route files for different components (users, products, cart, etc.)
router.use('/userRoutes', userRoutes);
router.use('/productRoutes', productRoutes);
router.use('/cartRoutes', cartRoutes);

module.exports = router;
