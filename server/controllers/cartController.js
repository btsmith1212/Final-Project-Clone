// const Cart = require('../models/Cart');
// const Product = require('../models/Products');

// const cartController = {
//   // Get the user's cart
//   getCart: async (req, res) => {
//     const userId = req.user.userId; // Assuming you have user information stored in the request (possibly from authentication middleware)
//     try {
//       const userCart = await Cart.findOne({ user: userId }).populate('items.product');
//       res.json(userCart);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   },

//   // Add an item to the cart
//   addItemToCart: async (req, res) => {
//     const userId = req.user.userId;
//     const { productId, quantity } = req.body;

//     try {
//       const product = await Product.findById(productId);
//       if (!product) {
//         return res.status(404).json({ error: 'Product not found' });
//       }

//       const userCart = await Cart.findOne({ user: userId });
//       if (!userCart) {
//         // If the user doesn't have a cart, create one
//         const newCart = new Cart({ user: userId, items: [{ product: productId, quantity }] });
//         const savedCart = await newCart.save();
//         return res.status(201).json(savedCart);
//       }

//       // If the user already has a cart, update the existing cart
//       const existingItem = userCart.items.find((item) => item.product.toString() === productId);
//       if (existingItem) {
//         // If the product is already in the cart, update the quantity
//         existingItem.quantity += quantity;
//       } else {
//         // If the product is not in the cart, add it
//         userCart.items.push({ product: productId, quantity });
//       }

//       const updatedCart = await userCart.save();
//       res.json(updatedCart);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   },

//   // Update quantity of an item in the cart
//   updateCartItemQuantity: async (req, res) => {
//     const userId = req.user.userId;
//     const { productId, quantity } = req.body;

//     try {
//       const userCart = await Cart.findOne({ user: userId });
//       if (!userCart) {
//         return res.status(404).json({ error: 'Cart not found' });
//       }

//       const existingItem = userCart.items.find((item) => item.product.toString() === productId);
//       if (!existingItem) {
//         return res.status(404).json({ error: 'Item not found in the cart' });
//       }

//       // Update the quantity
//       existingItem.quantity = quantity;

//       const updatedCart = await userCart.save();
//       res.json(updatedCart);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   },

//   // Remove an item from the cart
//   removeItemFromCart: async (req, res) => {
//     const userId = req.user.userId;
//     const { productId } = req.params;

//     try {
//       const userCart = await Cart.findOne({ user: userId });
//       if (!userCart) {
//         return res.status(404).json({ error: 'Cart not found' });
//       }

//       // Remove the item from the cart
//       userCart.items = userCart.items.filter((item) => item.product.toString() !== productId);

//       const updatedCart = await userCart.save();
//       res.json(updatedCart);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   },
// };

// module.exports = cartController;
