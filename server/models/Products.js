const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  description: { type: String, default: '' }, // Added a default value for description
  category: { type: String, default: 'Uncategorized' }, // Added a default value for category
  // Add other fields as needed for your product model
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;