const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const authenticateUser = require('./utils/auth');
const { typeDefs, resolvers } = require('./schemas');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/ShopSphere', { useNewUrlParser: true, useUnifiedTopology: true });

// Apply middleware for authentication
app.use(authenticateUser);

// Apply middleware for GraphQL
const server = new ApolloServer({ typeDefs, resolvers });

async function startServer() {
  await server.start();
  server.applyMiddleware({ app });
}

startServer();

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}!`);
  console.log(`GraphQL server running on http://localhost:${PORT}/graphql`);
});
