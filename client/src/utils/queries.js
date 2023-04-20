import { gql } from "@apollo/client";

export const QUERY_PROFILES = gql`
  query Users {
    Users {
      email
      _id
    }
  }
`;

export const QUERY_SINGLE_PROFILE = gql`
  query Users($userId: ID!) {
    User(userId: $userId) {
      _id
      email
      username
    }
  }
`;

export const QUERY_ME = gql`
  query Query {
    me {
      email
      username
    }
  }
`;

export const QUERY_BLOG_POSTS = gql`
  query BlogPost {
    BlogPost {
      _id
      blogPost
      createdAt
      creator
    }
  }
`;
// blogPostTitle not blogPost
// comments {
//         commentText
//       }
