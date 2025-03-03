const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL || 'mongodb://0.0.0.0:27017/ShopSphere');

module.exports = mongoose.connection;
