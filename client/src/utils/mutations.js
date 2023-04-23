import { gql } from "@apollo/client";

// export const ADD_USER = gql`
//   mutation addUser($username: String!, $email: String!, $password: String!) {
//     addUser(username: $username, email: $email, password: $password) {
//       email
//       password
//       username
//     }
//   }
// `;

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

export const ADD_BLOG_POST = gql`
  mutation Mutation($blogPost: String!, $blogTitle: String!, $creator: ID!) {
    addBlogPost(blogPost: $blogPost, blogTitle: $blogTitle, creator: $creator) {
      blogPost
      blogTitle
      creator
    }
  }
`;
