const { gql } = require('apollo-server-express');

const userTypeDefs = gql`
  type Query {
    getUser(userId: ID!): User
    getCart(userId: ID!): Cart 
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

  type User {
    _id: ID!
    username: String!
    password: String!
  }
`;

const productTypeDefs = gql`
  type Query {
    getProduct(productId: ID!): Product
    getAllProducts: [Product]
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
  }
`;
const cartTypeDefs = gql`
  type Query {
    getCart(userId: ID!): Cart
  }

  type Mutation {
    updateCart(userId: ID!, productId: ID!): Cart
  }

  type Cart {
    _id: ID!
    user: User  # Assuming you have a User type defined
    items: [CartItem]
  }

  type CartItem {
    product: Product  # Assuming you have a Product type defined
    quantity: Int
  }
`;


// Export an array of type definitions
module.exports = [userTypeDefs, productTypeDefs, cartTypeDefs];
