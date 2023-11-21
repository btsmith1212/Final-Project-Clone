const mongoose = require('mongoose');
const User = require('./User');
const Product = require('./Products');
const Cart = require('./Cart');

// Set up the connection to your MongoDB database
mongoose.connect('your-mongodb-connection-string', { useNewUrlParser: true, useUnifiedTopology: true });

// Export your models for use in other parts of your application
module.exports = {
  User,
  Product,
  Cart,
};

