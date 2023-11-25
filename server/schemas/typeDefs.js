const { gql } = require('apollo-server-express');

const typeDefs = gql `
  type User {
    _id: ID!
    username: String!
    carts: [Cart]
  }

  type Product {
    _id: ID
    name: String
    description: String
    image: String
    quantity: Int
    price: Float
    category: Category
  }

  type Cart {
    _id: ID
    products: [Product]
  }

  type Checkout {
    session: ID
  }

  type Category {
    _id: ID!
    name: String!
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    products(category: ID, name: String): [Product]
    product(_id: ID!): Product
    categories: [Category]
    user: User
    cart(_id: ID!): Cart
    checkout(products: [ID] !): Checkout
  }

  type Mutation {
    registerUser(username: String!, password: String!): Auth
    loginUser(username: String!, password: String!): Auth
    addCart(products: [ID] !): Cart
    removeCart(productId: ID !): User
    createProduct(input: ProductInput!): Product
    updateProduct(productId: ID!, input: ProductInput!): Product
  }

  input ProductInput {
    name: String!
    price: Float!
    description: String
    category: String
  }

  input CategoryInput {
    name: String!
  }
`;

module.exports = typeDefs;
