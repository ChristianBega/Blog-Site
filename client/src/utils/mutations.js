import { gql } from "@apollo/client";

// Mutation to add user - username & email & password required!
export const ADD_USER = gql`
  mutation AddUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      userProfile {
        email
        password
        username
      }
    }
  }
`;

// Mutation to add socials to a users profile - userId, socialLink, and socialPlatform required!
export const ADD_USER_SOCIALS = gql`
  mutation Mutation($userId: ID!, $socialLink: String!, $socialPlatform: String!) {
    addSocial(userId: $userId, socialLink: $socialLink, socialPlatform: $socialPlatform) {
      _id
      socials {
        socialLink
        socialPlatform
      }
    }
  }
`;

// Mutation to login user - email & password required!
export const LOGIN_USER = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      userProfile {
        email
        password
      }
    }
  }
`;

// Mutation to add blog post - blogPost, blogTitle, and creator required!
export const ADD_BLOG_POST = gql`
  mutation Mutation($blogPost: String!, $blogTitle: String!, $creator: String!, $creatorId: String!) {
    addBlogPost(blogPost: $blogPost, blogTitle: $blogTitle, creator: $creator, creatorId: $creatorId) {
      blogPost
      blogTitle
      creator
      creatorId
    }
  }
`;

// Mutation to add a comment to a blog post - blogPostId and commentText required
export const ADD_COMMENT = gql`
  mutation AddComment($blogPostId: ID!, $commentText: String!, $creatorId: String!, $creator: String!) {
    addComment(blogPostId: $blogPostId, commentText: $commentText, creatorId: $creatorId, creator: $creator) {
      _id
      comments {
        commentText
      }
      creator
      creatorId
    }
  }
`;
