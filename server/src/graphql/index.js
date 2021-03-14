import { gql, makeExecutableSchema } from "apollo-server-express";

import { typeDefs as User, resolvers as userResolvers } from "./schema/user.js";
import { typeDefs as Post, resolvers as postResolvers } from "./schema/post.js";
import {
  typeDefs as Comment,
  resolvers as commentResolvers,
} from "./schema/comment.js";
import { typeDefs as Like, resolvers as likeResolvers } from "./schema/like.js";

const Query = gql`
  type Query {
    _empty: String
  }

  type Mutation {
    _empty: String
  }

  type FieldError {
    email: String
    username: String
    password: String
    title: String
    body: String
  }

  scalar Date
`;

const schema = makeExecutableSchema({
  typeDefs: [Query, User, Post, Comment, Like],
  resolvers: [userResolvers, postResolvers, commentResolvers, likeResolvers],
});

export default schema;
