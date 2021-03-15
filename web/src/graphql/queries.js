import { gql } from "@apollo/client";

export const ME = gql`
  query Me {
    me {
      id
      username
    }
  }
`;

export const FEED = gql`
  query Feed($limit: Int!, $skip: Int) {
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
        updatedAt
      }
      hasMore
    }
  }
`;

export const POST = gql`
  query Post($id: ID!) {
    post(id: $id) {
      id
      title
      body
      creator {
        id
        username
      }
      comments {
        id
        body
        createdAt
        creator {
          username
        }
      }
      isLiked
      likesCount
      commentsCount
      createdAt
      updatedAt
    }
  }
`;
