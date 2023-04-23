const { gql } = require("@apollo/server");

const typeDefs = `
  #graphql

  type User {
    _id: ID
    username: String
    password: String
    email: String
    socials : [Social]
  }

  type Social {
    _id: ID
    socialLink: String
  }
  
  type Auth {
    token: ID!
    userProfile: User
  }
  

  type BlogPosts {
    _id: ID
    blogTitle : String
    creator: String
    createdAt: String
  }

  type BlogPost {
    _id: ID
    blogTitle : String
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
    Users: [User]!
    User(userId: ID!): User
    Me: User
    BlogPosts: [BlogPosts]
    BlogPost(blogId: ID!): BlogPost
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth

    addSocial(userId: ID!, socialLink: String!): User
    
    login(email: String!, password: String!): Auth
    
    addComment(blogPostId: ID!, commentText: String!): BlogPost
    removeComment(blogPostId: ID!, commentId: ID!): BlogPost

    addBlogPost(blogPost: String!, blogTitle: String!, creator: ID!): BlogPost
  }
  `;

module.exports = typeDefs;

// removeUser(userID: ID!): User
// type getReactions {
//     _id: ID
//     creator : String
//     createdAt : String
//   }
// getReactions: [getReactions];
