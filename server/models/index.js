const mongoose = require('mongoose');
const User = require('./User');
const Product = require('./Product');
const Cart = require('./Cart');

// Set up the connection to your MongoDB database
mongoose.connect('mongodb://localhost:27017/ShopSphere', { useNewUrlParser: true, useUnifiedTopology: true });

// Export your models for use in other parts of your application
module.exports = {
  User,
  Product,
  Cart,
};

