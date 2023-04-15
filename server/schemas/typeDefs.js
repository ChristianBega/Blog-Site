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
  type getBlogPosts {
    _id: ID
    blogPost: String
    creator: String
    createdAt: String
  }
  type Query {
    getUser: [getUser]!
    getBlogPosts: [getBlogPosts]
  }
`;

module.exports = typeDefs;
