import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation($username: String!, $password: String!) {
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
  mutation($input: RegisterInput!) {
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
  mutation {
    logout
  }
`;

export const CREATE_POST = gql`
  mutation($input: PostInput!) {
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
      }
      errors {
        title
        body
      }
    }
  }
`;
