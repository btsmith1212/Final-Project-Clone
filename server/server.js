const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const authenticateUser = require('./utils/auth');
const { typeDefs, resolvers } = require('./schemas');

// Import Express routes
const userRoutes = require('./routes/api/userRoutes');
const productRoutes = require('./routes/api/productRoutes');
const cartRoutes = require('./routes/api/cartRoutes');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/ShopSphere', { useNewUrlParser: true, useUnifiedTopology: true });

// Apply middleware for authentication
app.use(authenticateUser);

// Use your REST API routes
app.use('/api/userRoutes', userRoutes);
app.use('/api/productRoutes', productRoutes);
app.use('/api/cartRoutes', cartRoutes);

const server = new ApolloServer({ typeDefs, resolvers });

async function startServer() {
  await server.start();
  server.applyMiddleware({ app });
}

startServer();

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}!`);
  console.log(`Server is running on http://localhost:${PORT}/graphql`);
});
