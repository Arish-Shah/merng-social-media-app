const { gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    me: User
    posts: [Post!]!
    post(postID: ID!): Post
  }

  type Mutation {
    register(input: RegisterInput!): UserResponse!
    login(username: String!, password: String!): UserResponse!
    createPost(input: PostInput!): PostResponse!
    deletePost(id: ID!): Boolean!
    createComment(postID: ID!, body: String!): CommentResponse!
    deleteComment(postID: ID!, commentID: ID!): Boolean!
    like(postID: ID!): Boolean!
  }

  type Subscription {
    newPost: Post!
  }

  type User {
    id: ID!
    email: String!
    username: String!
    createdAt: Date!
    token: String!
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    creator: User!
    isLiked: Boolean!
    likesCount: Int!
    comments: [Comment!]!
    commentsCount: Int!
    createdAt: Date!
  }

  type Comment {
    id: ID!
    body: String!
    creator: User!
    post: Post!
  }

  type Like {
    id: ID!
    post: Post!
    creator: User!
    createdAt: Date!
  }

  type UserResponse {
    user: User
    errors: FieldError
  }

  type PostResponse {
    post: Post
    errors: FieldError
  }

  type CommentResponse {
    comment: Comment
    errors: FieldError
  }

  type FieldError {
    email: String
    username: String
    password: String
    title: String
    body: String
  }

  input RegisterInput {
    email: String!
    username: String!
    password: String!
  }

  input PostInput {
    title: String!
    body: String!
  }

  scalar Date
`;

module.exports = typeDefs;
