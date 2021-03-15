import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      user {
        id
      }
      errors {
        username
        password
      }
    }
  }
`;

export const REGISTER = gql`
  mutation Register($input: RegisterInput!) {
    register(input: $input) {
      user {
        id
        username
      }
      errors {
        email
        username
        password
      }
    }
  }
`;

export const LOGOUT = gql`
  mutation Logout {
    logout
  }
`;

export const CREATE_POST = gql`
  mutation CreatePost($input: PostInput!) {
    createPost(input: $input) {
      post {
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
      errors {
        title
        body
      }
    }
  }
`;

export const EDIT_POST = gql`
  mutation EditPost($postID: ID!, $input: PostInput!) {
    editPost(postID: $postID, input: $input)
  }
`;

export const DELETE_POST = gql`
  mutation DeletePost($postID: ID!) {
    deletePost(postID: $postID)
  }
`;

export const CREATE_COMMENT = gql`
  mutation CreateComment($body: String!, $postID: ID!) {
    createComment(body: $body, postID: $postID) {
      comment {
        id
        body
        createdAt
        creator {
          username
        }
      }
      errors {
        body
      }
    }
  }
`;

export const DELETE_COMMENT = gql`
  mutation DeleteComment($commentID: ID!) {
    deleteComment(commentID: $commentID)
  }
`;

export const LIKE = gql`
  mutation Like($postID: ID!) {
    like(postID: $postID)
  }
`;
