const { gql } = require('apollo-server-express');


const userTypeDefs = gql`
  type Query {
    getUser(userId: ID!): User
  }

  type Mutation {
    registerUser(input: RegisterInput): AuthResponse
    loginUser(input: LoginInput): AuthResponse
  }

  input RegisterInput {
    username: String!
    password: String!
  }

  input LoginInput {
    username: String!
    password: String!
  }

  type AuthResponse {
    success: Boolean!
    message: String
    token: String
  }

  # Other types and queries...
`;
const productTypeDefs = gql`
  type Query {
    getProduct(productId: ID!): Product
  }

  type Mutation {
    createProduct(input: ProductInput): Product
    updateProduct(productId: ID!, input: ProductInput): Product
    deleteProduct(productId: ID!): Product
  }

  input ProductInput {
    name: String!
    price: Float!
  }

  type Product {
    _id: ID!
    name: String!
    price: Float!
    # Add other product-related fields...
  }

  # Other types and queries specific to product...
`;

const typeDefs = [userTypeDefs, productTypeDefs, /* Add other type definitions as needed... */];


module.exports = {
  typeDefs
};