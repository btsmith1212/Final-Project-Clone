const { gql } = require('apollo-server-express');

const typeDefs = gql `
  type User {
    _id: ID!
    username: String!
    cart: Cart
  }

  type Product {
    _id: ID
    name: String
    description: String
    image: String
    quantity: Int
    price: Float
    purchaseQuantity: Int
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
    name: String
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
    checkout(products: [ID] !): Checkout
  }

  type Mutation {
    registerUser(username: String!, password: String!): Auth
    loginUser(username: String!, password: String!): Auth
    addCart(productId: ID!): User
    removeCart(productId: ID!): User
    createProduct(input: ProductInput!): Product
    updateProduct(productId: ID!, input: ProductInput!): Product
  }

  input ProductInput {
    name: String!
    price: Float
    image: String
    quantity: Int
    description: String
    category: CategoryInput
  }

  input CategoryInput {
    name: String!
  }
`;

module.exports = typeDefs;
