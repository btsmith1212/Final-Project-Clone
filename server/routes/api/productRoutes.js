const express = require('express');
const productController = require('../controllers/productController');
const authenticateUser = require('../utils/auth');

const router = express.Router();

// Define product routes
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.post('/', authenticateUser, productController.createProduct);
router.put('/:id', authenticateUser, productController.updateProductById);
router.delete('/:id', authenticateUser, productController.deleteProductById);

module.exports = router;
