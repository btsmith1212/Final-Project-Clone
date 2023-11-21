const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const authenticateUser = require('./middleware/auth');
const { typeDefs, resolvers } = require('./graphql/schema');

const app = express();

// consider using dotenv to hide your database credentials
// require('dotenv').config();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/ShopSphere', { useNewUrlParser: true, useUnifiedTopology: true });

// Apply middleware for authentication
app.use(authenticateUser);

const server = new ApolloServer({ typeDefs, resolvers });

server.applyMiddleware({ app });

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/graphql`);
});