// const Product = require('../models/Products');

// const productController = {
//   // Get all products
//   getAllProducts: async (req, res) => {
//     try {
//       const products = await Product.find();
//       res.json(products);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   },

//   // Get a single product by ID
//   getProductById: async (req, res) => {
//     const productId = req.params.id;
//     try {
//       const product = await Product.findById(productId);
//       if (!product) {
//         return res.status(404).json({ error: 'Product not found' });
//       }
//       res.json(product);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   },

//   // Create a new product
//   createProduct: async (req, res) => {
//     const { name, price, description, category } = req.body;
//     try {
//       const newProduct = new Product({ name, price, description, category });
//       const savedProduct = await newProduct.save();
//       res.status(201).json(savedProduct);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   },

//   // Update a product by ID
//   updateProductById: async (req, res) => {
//     const productId = req.params.id;
//     const updatedFields = req.body;
//     try {
//       const updatedProduct = await Product.findByIdAndUpdate(productId, updatedFields, { new: true });
//       if (!updatedProduct) {
//         return res.status(404).json({ error: 'Product not found' });
//       }
//       res.json(updatedProduct);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   },

//   // Delete a product by ID
//   deleteProductById: async (req, res) => {
//     const productId = req.params.id;
//     try {
//       const deletedProduct = await Product.findByIdAndDelete(productId);
//       if (!deletedProduct) {
//         return res.status(404).json({ error: 'Product not found' });
//       }
//       res.json(deletedProduct);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   },
// };

// module.exports = productController;
