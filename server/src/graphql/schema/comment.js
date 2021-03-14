import { gql, AuthenticationError } from "apollo-server-express";

import User from "../../models/User.js";
import Post from "../../models/Post.js";
import Comment from "../../models/Comment.js";

export const typeDefs = gql`
  extend type Mutation {
    createComment(body: String!, postID: ID!): CommentResponse!
  }

  type CommentResponse {
    comment: Comment
    errors: FieldError
  }

  type Comment {
    id: ID!
    body: String!
    post: Post!
    creator: User!
    createdAt: Date!
  }
`;

export const resolvers = {
  Mutation: {
    createComment: (_, { body, postID }, { req }) => {
      const { userID } = req.session;
      if (!userID) {
        throw new AuthenticationError("Unauthenticated");
      }

      if (!body.length) {
        return {
          errors: {
            body: "required",
          },
        };
      }

      const comment = Comment.create({ body, postID, creatorID: userID });
      return {
        comment,
      };
    },
  },
  Comment: {
    post: (parent) => {
      return Post.findById(parent.postID);
    },
    creator: (parent) => {
      return User.findById(parent.creatorID);
    },
  },
};
