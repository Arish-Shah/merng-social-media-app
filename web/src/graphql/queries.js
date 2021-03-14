import { gql } from "@apollo/client";

export const ME = gql`
  query {
    me {
      id
      username
    }
  }
`;

export const FEED = gql`
  query($limit: Int!, $skip: Int) {
    feed(limit: $limit, skip: $skip) {
      posts {
        id
        title
        snippet
        creator {
          id
          username
        }
        likesCount
        commentsCount
        isLiked
        createdAt
      }
      hasMore
    }
  }
`;
