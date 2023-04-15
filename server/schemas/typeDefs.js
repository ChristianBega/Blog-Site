const { gql } = require("@apollo/server");

// Set up TypeDefs in backticks
const typeDefs = `
  #graphql
  type getUser {
    _id: ID
    username: String
    password: String
    email: String
  }
  type Query {
    getUser: [getUser]!
  }
`;

module.exports = typeDefs;
