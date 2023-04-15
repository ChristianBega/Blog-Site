const { gql } = require("@apollo/server");

const typeDefs = `
  #graphql

  type User {
    _id: ID
    username: String
    password: String
    email: String
  }
  type BlogPost {
    _id: ID
    blogPost: String
    creator: String
    createdAt: String
    comments: [Comment]!
  }
  type Comment {
    _id: ID
    commentText: String
    createdAt : String
  }

  type Query {
    User: [User]!
    BlogPost: [BlogPost]
  }

  type Mutation {
    addComment(blogPostId: ID!, commentText: String!): BlogPost
    removeComment(blogPostId: ID!, commentId: ID!): BlogPost
  }
`;

module.exports = typeDefs;

// type getReactions {
//     _id: ID
//     creator : String
//     createdAt : String
//   }
// getReactions: [getReactions];
