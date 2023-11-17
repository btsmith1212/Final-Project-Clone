const { gql } = require('apollo-server-express');
const userMutations = require('./mutations/user');

const typeDefs = gql`
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

const resolvers = {
  Mutation: {
    ...userMutations,
    // Other mutations...
  },
  // Other resolvers...
};

module.exports = {
  typeDefs,
  resolvers,
};