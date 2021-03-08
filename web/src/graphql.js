import { gql } from "@apollo/client";

export const POSTS_QUERY = gql`
  query Posts {
    posts {
      id
      title
      body
      creator {
        id
        username
        email
        createdAt
      }
      commentsCount
      comments {
        body
        creator {
          username
        }
      }
      likesCount
      createdAt
    }
  }
`;
