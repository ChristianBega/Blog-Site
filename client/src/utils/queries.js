import { gql } from "@apollo/client";

// Query for all user profiles
export const QUERY_PROFILES = gql`
  query Users {
    Users {
      email
      _id
    }
  }
`;

// Query for single user profile - userId required!
export const QUERY_SINGLE_PROFILE = gql`
  query Query($userId: ID!) {
    User(userId: $userId) {
      _id
      email
      username
      socials {
        socialLink
        socialPlatform
      }
    }
  }
`;

//! Todo - verify queryMe for finding current user is working
// Query for finding current user
// export const QUERY_ME = gql`
//   query Query {
//     Me {
//       _id
//       email
//       socials {
//         socialLink
//         socialPlatform
//       }
//     }
//   }
// `;

// Query for finding all blog posts
export const QUERY_BLOG_POSTS = gql`
  query BlogPosts {
    BlogPosts {
      _id
      blogTitle
      createdAt
      creator
    }
  }
`;

// Query for finding a single blog post - blogId required!
export const QUERY_SINGLE_BLOG_POST = gql`
  query BlogPost($blogId: ID!) {
    BlogPost(blogId: $blogId) {
      _id
      blogPost
      blogTitle
      comments {
        commentText
        createdAt
      }
      createdAt
      creator
      creatorId
    }
  }
`;
