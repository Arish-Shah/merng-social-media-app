const { gql } = require("apollo-server");
const mongoose = require("mongoose");

const { ObjectId } = mongoose.Types;

ObjectId.prototype.valueOf = function () {
  return this.toString();
};

const typeDefs = gql`
  type Query {
    me: User
    posts: [Post!]!
  }

  type Mutation {
    register(input: RegisterInput!): AuthPayload!
    login(username: String!, password: String!): AuthPayload!
    createPost(input: PostInput!): PostResponse!
    deletePost(id: ID!): Boolean!
  }

  type AuthPayload {
    user: User
    errors: FieldError
    token: String!
  }

  type User {
    id: ID!
    email: String!
    username: String!
    createdAt: Date!
  }

  type PostResponse {
    post: Post
    errors: FieldError
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    creator: User!
    createdAt: Date!
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
