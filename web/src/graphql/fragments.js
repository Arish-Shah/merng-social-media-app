import { gql } from "@apollo/client";

export const POST_FRAGMENT = gql`
  fragment _ on Post {
    likesCount
    isLiked
  }
`;

export const COMMENT_FRAGMENT = gql`
  fragment __ on Post {
    commentsCount
    comments {
      id
      body
      createdAt
      creator {
        username
      }
    }
  }
`;

export const COMMENTS_COUNT_FRAGMENT = gql`
  fragment ___ on Post {
    commentsCount
  }
`;
